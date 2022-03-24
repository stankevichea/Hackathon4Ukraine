using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hackathon4Ukraine.API.Maps;

namespace Hackathon4Ukraine.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MapController : ControllerBase
    {
        private readonly MapService _mapService;
        public MapController()
        {
            _mapService = new MapService();
        }

        [HttpGet]
        public IActionResult Get(int v)
        {
            if (v == 0)
            {
                return Ok(_mapService.Get());

            }
            return Ok(_mapService.Get().Where(x => x.Icon == v).ToList());
        }

    }
}
