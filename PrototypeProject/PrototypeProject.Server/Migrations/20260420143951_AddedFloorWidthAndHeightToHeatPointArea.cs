using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PrototypeProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddedFloorWidthAndHeightToHeatPointArea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Floor",
                table: "HeatpointAreas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "HeatpointAreas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Width",
                table: "HeatpointAreas",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "HeatpointAreas");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "HeatpointAreas");

            migrationBuilder.DropColumn(
                name: "Width",
                table: "HeatpointAreas");
        }
    }
}
