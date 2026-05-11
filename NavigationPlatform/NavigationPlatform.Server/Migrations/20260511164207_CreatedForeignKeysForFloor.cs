using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NavigationPlatform.Server.Migrations
{
    /// <inheritdoc />
    public partial class CreatedForeignKeysForFloor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Floor",
                table: "HeatpointAreas");

            migrationBuilder.DropColumn(
                name: "Floor",
                table: "GraphNodes");

            migrationBuilder.AddColumn<Guid>(
                name: "FloorId",
                table: "HeatpointAreas",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "FloorId",
                table: "GraphNodes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Floors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Number = table.Column<int>(type: "integer", nullable: false),
                    FileName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Floors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HeatpointAreas_FloorId",
                table: "HeatpointAreas",
                column: "FloorId");

            migrationBuilder.CreateIndex(
                name: "IX_GraphNodes_FloorId",
                table: "GraphNodes",
                column: "FloorId");

            migrationBuilder.AddForeignKey(
                name: "FK_GraphNodes_Floors_FloorId",
                table: "GraphNodes",
                column: "FloorId",
                principalTable: "Floors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HeatpointAreas_Floors_FloorId",
                table: "HeatpointAreas",
                column: "FloorId",
                principalTable: "Floors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GraphNodes_Floors_FloorId",
                table: "GraphNodes");

            migrationBuilder.DropForeignKey(
                name: "FK_HeatpointAreas_Floors_FloorId",
                table: "HeatpointAreas");

            migrationBuilder.DropTable(
                name: "Floors");

            migrationBuilder.DropIndex(
                name: "IX_HeatpointAreas_FloorId",
                table: "HeatpointAreas");

            migrationBuilder.DropIndex(
                name: "IX_GraphNodes_FloorId",
                table: "GraphNodes");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "HeatpointAreas");

            migrationBuilder.DropColumn(
                name: "FloorId",
                table: "GraphNodes");

            migrationBuilder.AddColumn<int>(
                name: "Floor",
                table: "HeatpointAreas",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Floor",
                table: "GraphNodes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
