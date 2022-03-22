using Hackathon4Ukraine_Team2_App.Domain;

namespace Hackathon4Ukraine_Team2_App.Services.Interfaces
{
    public interface IRequestHelpService
    {
        Task SaveRequest(RequestHelp model);
    }
}