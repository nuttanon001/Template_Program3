using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class updateTreatment1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalTime",
                table: "Treatments",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 37, 51, 335, DateTimeKind.Local).AddTicks(9843));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 37, 51, 336, DateTimeKind.Local).AddTicks(4687));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 37, 51, 336, DateTimeKind.Local).AddTicks(4700));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 37, 51, 336, DateTimeKind.Local).AddTicks(4700));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 28, 11, 37, 51, 336, DateTimeKind.Local).AddTicks(4704));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalTime",
                table: "Treatments");

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
    }
}
