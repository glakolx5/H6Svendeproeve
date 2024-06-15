using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HouseItems_AspNetUsers_UserId",
                table: "HouseItems");

            migrationBuilder.DropIndex(
                name: "IX_HouseItems_UserId",
                table: "HouseItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "HouseItems");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "HouseItems",
                type: "varchar(255)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_HouseItems_UserId",
                table: "HouseItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_HouseItems_AspNetUsers_UserId",
                table: "HouseItems",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
