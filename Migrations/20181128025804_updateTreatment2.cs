using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Template_Program.Migrations
{
    public partial class updateTreatment2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Diagnoses_DiagnosisId",
                table: "Treatments");

            migrationBuilder.RenameColumn(
                name: "DiagnosisId",
                table: "Treatments",
                newName: "PetHaveDiagnosisId");

            migrationBuilder.RenameIndex(
                name: "IX_Treatments_DiagnosisId",
                table: "Treatments",
                newName: "IX_Treatments_PetHaveDiagnosisId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Treatments",
                column: "PetHaveDiagnosisId",
                principalTable: "PetHaveDiagnosis",
                principalColumn: "PetHaveDiagnosisId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_PetHaveDiagnosis_PetHaveDiagnosisId",
                table: "Treatments");

            migrationBuilder.RenameColumn(
                name: "PetHaveDiagnosisId",
                table: "Treatments",
                newName: "DiagnosisId");

            migrationBuilder.RenameIndex(
                name: "IX_Treatments_PetHaveDiagnosisId",
                table: "Treatments",
                newName: "IX_Treatments_DiagnosisId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_Diagnoses_DiagnosisId",
                table: "Treatments",
                column: "DiagnosisId",
                principalTable: "Diagnoses",
                principalColumn: "DiagnosisId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
