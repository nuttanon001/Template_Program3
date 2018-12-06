using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class addAppointment2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AppointmentTime",
                table: "Appointments",
                maxLength: 10,
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppointmentTime",
                table: "Appointments");

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 14, 23, 53, 790, DateTimeKind.Local).AddTicks(7985));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 14, 23, 53, 791, DateTimeKind.Local).AddTicks(2767));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 14, 23, 53, 791, DateTimeKind.Local).AddTicks(2779));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 14, 23, 53, 791, DateTimeKind.Local).AddTicks(2783));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 29, 14, 23, 53, 791, DateTimeKind.Local).AddTicks(2783));
        }
    }
}
