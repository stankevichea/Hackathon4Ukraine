using Hackathon4Ukraine_Team2_App.DataAccess;
using Hackathon4Ukraine_Team2_App.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hackathon4Ukraine_Team2_App.Domain
{
    public class RequestHelpService : IRequestHelpService
    {
        private readonly ILogger<RequestHelpService> _logger;
        private readonly AppDbContext _dbContext;

        public RequestHelpService(ILogger<RequestHelpService> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task SaveRequest(RequestHelp model)
        {
            try
            {
                _dbContext.RequestHelps.Add(model);
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex) when (ex.Message.Contains("Conflicts were detected"))
            {
                model.Id = Guid.NewGuid();
                await SaveRequest(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to save entity: {0}", model);
            }
        }
    }
}
