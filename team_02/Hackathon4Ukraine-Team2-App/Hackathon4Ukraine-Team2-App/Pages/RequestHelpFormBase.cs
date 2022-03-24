using Hackathon4Ukraine_Team2_App.DataAccess;
using Hackathon4Ukraine_Team2_App.Domain;
using Hackathon4Ukraine_Team2_App.Extensions;
using Hackathon4Ukraine_Team2_App.Helpers;
using Hackathon4Ukraine_Team2_App.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Hackathon4Ukraine_Team2_App.Pages;

public class RequestHelpFormBase : ComponentBase
{
    [Inject]
    private AppDbContext DbContext { get; set; }
    [Inject]
    private IRequestHelpService RequestHelpService { get; set; }
    [Inject]
    private ILogger<RequestHelpForm> Logger { get; set; }
    [Inject]
    protected NavigationManager NavigationManager { get; set; }

    protected RequestHelp Model { get; } = new();
    protected List<Category> Categories { get; private set; } = new List<Category>();

    protected override async Task OnInitializedAsync()
    {
        Categories = await DbContext.Categories.ToListAsync();
        await base.OnInitializedAsync();
    }

    protected async Task HandleValidSubmit()
    {
        Logger.LogInformation("HandleValidSubmit called with + " + Model.Name);
        if (Model.Name.IsNullOrEmpty())
        {
            throw new InvalidOperationException("Name is required");
        }

        // Process the valid form
        await RequestHelpService.SaveRequest(Model);
        NavigationManager.NavigateTo( NavigationHelper.ViewRequestHelp(Model.Id));
    }
}
