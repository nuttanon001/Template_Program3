using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class updatePerHasDiagosis2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StatusPetHasDiagonsis",
                table: "PetHaveDiagnosis",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 7, 13, 735, DateTimeKind.Local).AddTicks(3425));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 7, 13, 735, DateTimeKind.Local).AddTicks(7768));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 7, 13, 735, DateTimeKind.Local).AddTicks(7780));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 7, 13, 735, DateTimeKind.Local).AddTicks(7785));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 7, 13, 735, DateTimeKind.Local).AddTicks(7785));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusPetHasDiagonsis",
                table: "PetHaveDiagnosis");

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 9, 58, 4, 5, DateTimeKind.Local).AddTicks(2474));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 9, 58, 4, 5, DateTimeKind.Local).AddTicks(7421));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 9, 58, 4, 5, DateTimeKind.Local).AddTicks(7437));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 9, 58, 4, 5, DateTimeKind.Local).AddTicks(7437));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 9, 58, 4, 5, DateTimeKind.Local).AddTicks(7437));
        }
    }
}
