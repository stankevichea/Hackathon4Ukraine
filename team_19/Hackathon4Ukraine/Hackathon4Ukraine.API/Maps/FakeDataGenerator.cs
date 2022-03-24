using System.Collections.Generic;
using AutoBogus;

namespace Hackathon4Ukraine.API.Maps
{
    public class FakeDataGenerator
    {
        private readonly List<int> _icons = new List<int> { 1, 2, 3, 4 };
        public FakeDataGenerator()
        {
            AutoFaker.Configure(builder =>
            {
                builder
                    .WithLocale("uk")
                    .WithRepeatCount(100);
            });
        }

        public List<MapItem> GetMapItems()
        {
            var result = new List<MapItem>();

            var uk = new AutoFaker<MapItem>()
                .Configure(b => b.WithLocale("uk"))
                .RuleFor(x => x.Latitude, faker => faker.Random.Decimal(46.787963m, 51.567030m))
                .RuleFor(x => x.Longitude, faker => faker.Random.Decimal(23.335628m, 36.779508m))
                .RuleFor(x => x.Icon, faker => faker.Random.ListItem(_icons))
                .RuleFor(x => x.Url, (faker, o) => $"single_{o.Icon}.html")
                .RuleFor(x => x.Title, faker => faker.Lorem.Sentence(faker.Random.Int(3, 5)))
                .Generate(100);


            var pl = new AutoFaker<MapItem>()
                .Configure(b => b.WithLocale("uk"))
                .RuleFor(x => x.Latitude, faker => faker.Random.Decimal(48.659910m, 54.302948m))
                .RuleFor(x => x.Longitude, faker => faker.Random.Decimal(11.061977m, 22.722607m))
                .RuleFor(x => x.Icon, faker => faker.Random.ListItem(_icons))
                .RuleFor(x => x.Url, (faker, o) => $"single_{o.Icon}.html")
                .RuleFor(x => x.Title, faker => faker.Lorem.Sentence(faker.Random.Int(3, 5)))
                .Generate(75);


            result.AddRange(uk);
            result.AddRange(pl);



            return result;
        }
    }
}