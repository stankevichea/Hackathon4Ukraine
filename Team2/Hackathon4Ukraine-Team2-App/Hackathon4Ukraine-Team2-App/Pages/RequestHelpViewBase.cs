using Hackathon4Ukraine_Team2_App.DataAccess;
using Hackathon4Ukraine_Team2_App.Domain;
using Hackathon4Ukraine_Team2_App.Extensions;
using Hackathon4Ukraine_Team2_App.Services.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Hackathon4Ukraine_Team2_App.Pages;

public class RequestHelpViewBase : ComponentBase
{
    [Inject]
    private AppDbContext DbContext { get; set; }

    protected RequestHelp Model { get; set; } = new();

    [Parameter]
    public string Id { get; set; }

    protected override async Task OnInitializedAsync()
    {
        var guid = new Guid(Id);
        var model = await DbContext.RequestHelps.FirstOrDefaultAsync(r => r.Id == guid);
        if (model != null)
        {
            Model = model;
        }
        await base.OnInitializedAsync();
    }
}
