using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RSVP.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddOtpTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Club",
                columns: table => new
                {
                    club_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    club_name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    club_department = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    club_email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    club_contact = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    club_createdAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    club_updatedAt = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Club__BCAD3DD90E16358F", x => x.club_id);
                });

            migrationBuilder.CreateTable(
                name: "Otps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Otps", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    PRN = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Department = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Year = table.Column<int>(type: "int", nullable: true),
                    Div = table.Column<string>(type: "char(1)", unicode: false, fixedLength: true, maxLength: 1, nullable: true),
                    Batch = table.Column<string>(type: "varchar(2)", unicode: false, maxLength: 2, nullable: true),
                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Contact = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Password = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Student__C5732E11041F5F09", x => x.PRN);
                });

            migrationBuilder.CreateTable(
                name: "User_Credential",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    emailId = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    password = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__User_Cre__B9BE370F879D2DF5", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "Organisation",
                columns: table => new
                {
                    org_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    org_name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    org_department = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    org_role = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    org_email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    org_contact = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    org_no_of_events = table.Column<int>(type: "int", nullable: true),
                    club_id = table.Column<int>(type: "int", nullable: true),
                    org_password = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Organisa__F6AD801253264259", x => x.org_id);
                    table.ForeignKey(
                        name: "FK__Organisat__club___7B264821",
                        column: x => x.club_id,
                        principalTable: "Club",
                        principalColumn: "club_id");
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    event_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    org_id = table.Column<int>(type: "int", nullable: true),
                    event_name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    event_date = table.Column<DateOnly>(type: "date", nullable: true),
                    event_description = table.Column<string>(type: "text", nullable: true),
                    event_start_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    event_end_time = table.Column<TimeOnly>(type: "time", nullable: true),
                    event_venue = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    event_status = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    event_mode = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    event_no_of_seats = table.Column<int>(type: "int", nullable: true),
                    event_eligibility = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    event_paid = table.Column<string>(type: "varchar(3)", unicode: false, maxLength: 3, nullable: true),
                    event_amount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    event_qr = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Event__2370F727E629DD51", x => x.event_id);
                    table.ForeignKey(
                        name: "FK__Event__org_id__7EF6D905",
                        column: x => x.org_id,
                        principalTable: "Organisation",
                        principalColumn: "org_id");
                });

            migrationBuilder.CreateTable(
                name: "Event_Registration",
                columns: table => new
                {
                    event_reg_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    event_id = table.Column<int>(type: "int", nullable: true),
                    student_id = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    transaction_id = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    payment_screenshot = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Event_Re__117515140124FB22", x => x.event_reg_id);
                    table.ForeignKey(
                        name: "FK__Event_Reg__event__02C769E9",
                        column: x => x.event_id,
                        principalTable: "Event",
                        principalColumn: "event_id");
                    table.ForeignKey(
                        name: "FK__Event_Reg__stude__03BB8E22",
                        column: x => x.student_id,
                        principalTable: "Student",
                        principalColumn: "PRN");
                });

            migrationBuilder.CreateTable(
                name: "Attendance",
                columns: table => new
                {
                    attendance_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    event_registration_id = table.Column<int>(type: "int", nullable: true),
                    status = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Attendan__20D6A9681696933F", x => x.attendance_id);
                    table.ForeignKey(
                        name: "FK__Attendanc__event__0880433F",
                        column: x => x.event_registration_id,
                        principalTable: "Event_Registration",
                        principalColumn: "event_reg_id");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Attendan__204276F51E0C45A2",
                table: "Attendance",
                column: "event_registration_id",
                unique: true,
                filter: "[event_registration_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Event_org_id",
                table: "Event",
                column: "org_id");

            migrationBuilder.CreateIndex(
                name: "IX_Event_Registration_event_id",
                table: "Event_Registration",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_Event_Registration_student_id",
                table: "Event_Registration",
                column: "student_id");

            migrationBuilder.CreateIndex(
                name: "IX_Organisation_club_id",
                table: "Organisation",
                column: "club_id");

            migrationBuilder.CreateIndex(
                name: "UQ__User_Cre__87355E73B760BF25",
                table: "User_Credential",
                column: "emailId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendance");

            migrationBuilder.DropTable(
                name: "Otps");

            migrationBuilder.DropTable(
                name: "User_Credential");

            migrationBuilder.DropTable(
                name: "Event_Registration");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Student");

            migrationBuilder.DropTable(
                name: "Organisation");

            migrationBuilder.DropTable(
                name: "Club");
        }
    }
}
