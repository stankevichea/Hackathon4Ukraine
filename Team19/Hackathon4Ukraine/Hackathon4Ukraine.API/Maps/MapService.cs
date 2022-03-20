using System;
using System.Collections.Generic;
using System.Linq;

namespace Hackathon4Ukraine.API.Maps
{
    public class MapService
    {
        public List<MapItem> Get()
        {
            return new FakeDataGenerator().GetMapItems();
        }

    }
}