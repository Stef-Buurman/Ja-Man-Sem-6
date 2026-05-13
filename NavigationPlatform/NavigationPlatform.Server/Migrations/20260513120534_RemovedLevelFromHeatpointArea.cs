using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NavigationPlatform.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemovedLevelFromHeatpointArea : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "HeatpointAreas");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "HeatpointAreas",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
