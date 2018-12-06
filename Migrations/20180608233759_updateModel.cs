using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class updateModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PetHaveDiagnosis_Diagnoses_DiagnosisId",
                table: "PetHaveDiagnosis");

            migrationBuilder.DropIndex(
                name: "IX_PetHaveDiagnosis_DiagnosisId",
                table: "PetHaveDiagnosis");

            migrationBuilder.DropColumn(
                name: "DiagnosisId",
                table: "PetHaveDiagnosis");

            migrationBuilder.RenameColumn(
                name: "PetHaveDiagnosisMasterId",
                table: "PetHaveDiagnosis",
                newName: "PetHaveDiagnosisId");

            migrationBuilder.RenameColumn(
                name: "BrithDate",
                table: "Pet",
                newName: "BirthDate");

            migrationBuilder.RenameColumn(
                name: "BreedID",
                table: "Breed",
                newName: "BreedId");

            migrationBuilder.AddColumn<bool>(
                name: "Hydration",
                table: "PetHaveDiagnosis",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sterilization",
                table: "Pet",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PetHaveDiagnosisId",
                table: "Diagnoses",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_PetHaveDiagnosisId",
                table: "Diagnoses",
                column: "PetHaveDiagnosisId");

            migrationBuilder.AddForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses",
                column: "PetHaveDiagnosisId",
                principalTable: "PetHaveDiagnosis",
                principalColumn: "PetHaveDiagnosisId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Diagnoses_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Diagnoses");

            migrationBuilder.DropIndex(
                name: "IX_Diagnoses_PetHaveDiagnosisId",
                table: "Diagnoses");

            migrationBuilder.DropColumn(
                name: "Hydration",
                table: "PetHaveDiagnosis");

            migrationBuilder.DropColumn(
                name: "Sterilization",
                table: "Pet");

            migrationBuilder.DropColumn(
                name: "PetHaveDiagnosisId",
                table: "Diagnoses");

            migrationBuilder.RenameColumn(
                name: "PetHaveDiagnosisId",
                table: "PetHaveDiagnosis",
                newName: "PetHaveDiagnosisMasterId");

            migrationBuilder.RenameColumn(
                name: "BirthDate",
                table: "Pet",
                newName: "BrithDate");

            migrationBuilder.RenameColumn(
                name: "BreedId",
                table: "Breed",
                newName: "BreedID");

            migrationBuilder.AddColumn<int>(
                name: "DiagnosisId",
                table: "PetHaveDiagnosis",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedID",
                keyValue: 1,
                column: "CreateDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedID",
                keyValue: 2,
                column: "CreateDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedID",
                keyValue: 3,
                column: "CreateDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedID",
                keyValue: 4,
                column: "CreateDate",
                value: null);

            migrationBuilder.UpdateData(
                table: "Breed",
                keyColumn: "BreedID",
                keyValue: 5,
                column: "CreateDate",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_PetHaveDiagnosis_DiagnosisId",
                table: "PetHaveDiagnosis",
                column: "DiagnosisId",
                unique: true,
                filter: "[DiagnosisId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PetHaveDiagnosis_Diagnoses_DiagnosisId",
                table: "PetHaveDiagnosis",
                column: "DiagnosisId",
                principalTable: "Diagnoses",
                principalColumn: "DiagnosisId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
