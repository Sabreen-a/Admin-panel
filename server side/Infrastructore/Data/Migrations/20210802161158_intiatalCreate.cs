using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructore.Data.Migrations
{
    public partial class intiatalCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipToAddress_ZipCode",
                table: "Orders",
                newName: "ShipToAddress_NumberHouse");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShipToAddress_NumberHouse",
                table: "Orders",
                newName: "ShipToAddress_ZipCode");
        }
    }
}
