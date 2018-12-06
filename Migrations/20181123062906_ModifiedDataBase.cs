using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class ModifiedDataBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses");

            migrationBuilder.AlterColumn<int>(
                name: "PetHaveDiagnosisId",
                table: "Diagnoses",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNo",
                table: "Customer",
                maxLength: 20,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MailAddress",
                table: "Customer",
                maxLength: 150,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Infomation",
                table: "Customer",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address2",
                table: "Customer",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customer",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 11, 23, 13, 29, 5, 708, DateTimeKind.Local).AddTicks(4042));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 11, 23, 13, 29, 5, 724, DateTimeKind.Local).AddTicks(5757));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 11, 23, 13, 29, 5, 724, DateTimeKind.Local).AddTicks(5769));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 11, 23, 13, 29, 5, 724, DateTimeKind.Local).AddTicks(5773));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 11, 23, 13, 29, 5, 724, DateTimeKind.Local).AddTicks(5773));

            migrationBuilder.CreateIndex(
                name: "IX_PetHaveDiagnosis_PetId",
                table: "PetHaveDiagnosis",
                column: "PetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses",
                column: "PetHaveDiagnosisId",
                principalTable: "PetHaveDiagnosis",
                principalColumn: "PetHaveDiagnosisId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PetHaveDiagnosis_Pet_PetId",
                table: "PetHaveDiagnosis",
                column: "PetId",
                principalTable: "Pet",
                principalColumn: "PetId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses");

            migrationBuilder.DropForeignKey(
                name: "FK_PetHaveDiagnosis_Pet_PetId",
                table: "PetHaveDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_PetHaveDiagnosis_PetId",
                table: "PetHaveDiagnosis");

            migrationBuilder.AlterColumn<int>(
                name: "PetHaveDiagnosisId",
                table: "Diagnoses",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNo",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 20,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MailAddress",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 150,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Infomation",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address2",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customer",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 1,
                column: "CreateDate",
                value: new DateTime(2018, 6, 9, 6, 37, 58, 359, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 2,
                column: "CreateDate",
                value: new DateTime(2018, 6, 9, 6, 37, 58, 360, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 3,
                column: "CreateDate",
                value: new DateTime(2018, 6, 9, 6, 37, 58, 360, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 4,
                column: "CreateDate",
                value: new DateTime(2018, 6, 9, 6, 37, 58, 360, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedId",
                keyValue: 5,
                column: "CreateDate",
                value: new DateTime(2018, 6, 9, 6, 37, 58, 360, DateTimeKind.Local));

            migrationBuilder.AddForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses",
                column: "PetHaveDiagnosisId",
                principalTable: "PetHaveDiagnosis",
                principalColumn: "PetHaveDiagnosisId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
