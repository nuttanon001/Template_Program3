using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class updatePetHaveDianosis : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Temperature",
                table: "PetHaveDiagnosis",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 12, 8, 17, 11, 13, 470, DateTimeKind.Local).AddTicks(5258));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 12, 8, 17, 11, 13, 470, DateTimeKind.Local).AddTicks(5258));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 12, 8, 17, 11, 13, 470, DateTimeKind.Local).AddTicks(5258));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 12, 8, 17, 11, 13, 470, DateTimeKind.Local).AddTicks(5258));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 12, 8, 17, 11, 13, 470, DateTimeKind.Local).AddTicks(5258));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Temperature",
                table: "PetHaveDiagnosis");

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(4338));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9060));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 15, 2, 52, 107, DateTimeKind.Local).AddTicks(9076));
        }
    }
}
