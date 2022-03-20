export class TranslationResponse {
  public data: TranslatedData;
}

export class TranslatedData {
  public translations: Translation[];
}

export class Translation {
  public translatedText: string;
}
