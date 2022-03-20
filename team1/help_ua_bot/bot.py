#!/usr/bin/env python
# pylint: disable=C0116,W0613
# This program is dedicated to the public domain under the CC0 license.

"""
Main script implementing chatbot logic
"""

import logging
from typing import Tuple, Dict, Any

from telegram import InlineKeyboardMarkup, InlineKeyboardButton, Update
from telegram.ext import (
    Updater,
    CommandHandler,
    MessageHandler,
    Filters,
    ConversationHandler,
    CallbackQueryHandler,
    CallbackContext,
)

from help_ua_bot.config import BOT_TOKEN, DIRECT_LINE_SECRET, ADMIN_USER_NAMES
from help_ua_bot.directlinebot import DirectLineAPI
from help_ua_bot.data.objects import (
    Unverified,
    URL,
    Question,
)

import validators

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

logger = logging.getLogger(__name__)

(
    START,
    CHOICE,
    CONVERSATION,
    SUGGEST_INFO,
    SUGGEST_INFO_TYPE,
    SUGGEST_URL,
    SUGGEST_QA_QUESTION,
    SUGGEST_QA_ANSWER,
    VERIFY_INFO,
) = range(9)

ASK_QUESTION, GIVE_INFO = range(2)

directlinebot = DirectLineAPI(DIRECT_LINE_SECRET)


def start(update: Update, context: CallbackContext):
    """Starts the conversation and asks the user about their gender."""
    reply_keyboard = [
        [
            InlineKeyboardButton(
                "Запропонувати інформацію", callback_data=str(GIVE_INFO)
            ),
            InlineKeyboardButton("Задати питання", callback_data=str(ASK_QUESTION)),
        ]
    ]
    if update.message.from_user.username in ADMIN_USER_NAMES:
        reply_keyboard.append(
            [
                InlineKeyboardButton(
                    "(Contributors only) Верифікувати інформацію",
                    callback_data=str(VERIFY_INFO),
                )
            ]
        )

    update.message.reply_text(
        "Доброго дня!\n"
        + "Я UAQA бот, можу відповісти на ваші питання"
        + " які можуть виникнути стосовно тимчасового"
        + " переміщення через війну.",
        reply_markup=InlineKeyboardMarkup(
            reply_keyboard,
            one_time_keyboard=True,
            input_field_placeholder="Чи ви хочете задати питання"
            + " чи поділитись інформацією?",
        ),
    )
    return CHOICE


def handle_start_choice(update: Update, context: CallbackContext):
    """Parses the CallbackQuery and updates the message text."""
    query = update.callback_query
    # CallbackQueries need to be answered, even if no notification to the user is needed
    # Some clients may have trouble otherwise. See https://core.telegram.org/bots/api#callbackquery
    query.answer()
    # query.edit_message_text(text=f"Selected option: {query.data}")
    if query.data == str(ASK_QUESTION):
        query.edit_message_text(
            text="Я спробую відповісти на ваші запитання, щоб повернутись напишіть /back"
        )
        return CONVERSATION
    elif query.data == str(GIVE_INFO):
        return SUGGEST_INFO
    elif query.data == str(VERIFY_INFO):
        return VERIFY_INFO


def qa_handler(update: Update, context: CallbackContext):
    """Sends messages to QnA Maker"""
    directlinebot.send_message(update.message.text)
    update.message.reply_text(directlinebot.get_message())

    return CONVERSATION


def suggest_info_handler(update: Update, context: CallbackContext):
    """Handles the suggestion of information"""
    query = update.callback_query
    reply_keyboard = [
        [
            InlineKeyboardButton("Запропонувати URL", callback_data=str(SUGGEST_URL)),
            InlineKeyboardButton(
                "Запропонувати відповідь на питання",
                callback_data=str(SUGGEST_QA_QUESTION),
            ),
        ]
    ]
    query.edit_message_text(
        text="Виберіть формат інформації яку ви хочете запропонувати",
        reply_markup=InlineKeyboardMarkup(reply_keyboard, one_time_keyboard=True,),
    )
    return SUGGEST_INFO_TYPE


def suggest_info_type_handler(update: Update, context: CallbackContext):
    """Handles type selection for information suggestion"""
    query = update.callback_query
    query.answer()
    if query.data == str(SUGGEST_QA_QUESTION):
        query.edit_message_text(text="Введіть питання")
        return SUGGEST_QA_QUESTION
    elif query.data == str(SUGGEST_URL):
        query.edit_message_text(text="Введіть URL")
        return SUGGEST_URL


def suggest_url(update: Update, context: CallbackContext):
    """Handles creating a suggestion for adding url to knowledge base"""
    message_text = update.message.text

    if validators.url(message_text):
        update.message.reply_text(
            f"Дякую за вашу інформацію. {message_text} буде перевірено і додано до бази знань."
        )
        URL(message_text).save()
        return start(update, context)
    else:
        update.message.reply_text(
            "Ви ввели некоректний URL. Будь ласка введіть коректний URL. Щоб вийти напишіть /start"
        )
        return SUGGEST_URL


def suggest_qa_question(update: Update, context: CallbackContext):
    """Handles creating a suggestion for adding qa to knowledge base"""
    update.message.reply_text("Тепер введіть відповідь на це питання.")
    # save question into context
    context.user_data["question"] = update.message.text
    return SUGGEST_QA_ANSWER


def suggest_qa_answer(update: Update, context: CallbackContext):
    """Handles creating a suggestion for adding qa to knowledge base"""
    update.message.reply_text(
        "Дякую за вашу інформацію. Це питання буде перевірено і додано до бази знань."
    )
    Question(context.user_data["question"], update.message.text).save()
    return start(update, context)


def exit_handler(update: Update, context: CallbackContext):
    """Exits to the start"""
    return start(update, context)


def verify_handler(update: Update, context: CallbackContext):
    """Verifies the message"""
    query = update.callback_query

    if query.data != str(VERIFY_INFO):
        record = context.user_data["record"]
        query.answer()
        if query.data == str(1):
            record.verify()

    reply_keyboard = [
        [
            InlineKeyboardButton("Accept", callback_data=str(1)),
            InlineKeyboardButton("Reject", callback_data=str(0),),
        ]
    ]
    record = Unverified.pop()
    if record is not None:
        query.edit_message_text(
            text=f"Accept the submission?\n{record.to_string()}",
            reply_markup=InlineKeyboardMarkup(reply_keyboard, one_time_keyboard=True,),
        )
        context.user_data["record"] = record
        return VERIFY_INFO
    else:
        query.edit_message_text(
            text="There are no unverified submissions. Try again later. /start to go back"
        )
        return -1


def main() -> None:
    """Run the bot."""
    # Create the Updater and pass it your bot's token.
    updater = Updater(BOT_TOKEN)

    # Get the dispatcher to register handlers
    dispatcher = updater.dispatcher

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            CHOICE: [CallbackQueryHandler(handle_start_choice),],
            CONVERSATION: [
                MessageHandler(Filters.text & ~Filters.command, qa_handler),
                CommandHandler("back", exit_handler),
            ],
            SUGGEST_INFO: [CallbackQueryHandler(suggest_info_handler),],
            SUGGEST_INFO_TYPE: [CallbackQueryHandler(suggest_info_type_handler),],
            SUGGEST_URL: [
                MessageHandler(Filters.text & ~Filters.command, suggest_url),
            ],
            SUGGEST_QA_QUESTION: [
                MessageHandler(Filters.text & ~Filters.command, suggest_qa_question),
            ],
            SUGGEST_QA_ANSWER: [
                MessageHandler(Filters.text & ~Filters.command, suggest_qa_answer),
            ],
            VERIFY_INFO: [
                CallbackQueryHandler(verify_handler),
                CommandHandler("back", exit_handler),
            ],
        },
        fallbacks=[CommandHandler("start", start)],
    )

    dispatcher.add_handler(conv_handler)

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == "__main__":
    main()
