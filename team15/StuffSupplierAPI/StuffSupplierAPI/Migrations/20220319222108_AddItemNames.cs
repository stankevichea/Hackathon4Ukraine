using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StuffSupplierAPI.Migrations
{
    public partial class AddItemNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItemNameId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ItemNameId",
                table: "Offers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ItemNames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemNames", x => x.Id);
                });

            string[] itemNames = new string[] { "diapers", "blanket", "medicine", "flour", "pasta", "oil", "water" };
            for (int i = 1; i < itemNames.Length; i++)
            {
                migrationBuilder.Sql($"INSERT INTO ItemNames (Name) VALUES ('{itemNames[i - 1]}');");
            }
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemNames");

            migrationBuilder.DropColumn(
                name: "ItemNameId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "ItemNameId",
                table: "Offers");
        }
    }
}
