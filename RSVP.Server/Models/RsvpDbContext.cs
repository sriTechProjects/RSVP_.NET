using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RSVP.Server.Models;

public partial class RsvpDbContext : DbContext
{
    public RsvpDbContext()
    {
    }

    public RsvpDbContext(DbContextOptions<RsvpDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Attendance> Attendances { get; set; }

    public virtual DbSet<Club> Clubs { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventRegistration> EventRegistrations { get; set; }

    public virtual DbSet<Organisation> Organisations { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<UserCredential> UserCredentials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=LAPTOP-1TJ9KVMG\\SQLEXPRESS;Initial Catalog=RSVP_DB;Integrated Security=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Attendance>(entity =>
        {
            entity.HasKey(e => e.AttendanceId).HasName("PK__Attendan__20D6A9681696933F");

            entity.ToTable("Attendance");

            entity.HasIndex(e => e.EventRegistrationId, "UQ__Attendan__204276F51E0C45A2").IsUnique();

            entity.Property(e => e.AttendanceId).HasColumnName("attendance_id");
            entity.Property(e => e.EventRegistrationId).HasColumnName("event_registration_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("status");

            entity.HasOne(d => d.EventRegistration).WithOne(p => p.Attendance)
                .HasForeignKey<Attendance>(d => d.EventRegistrationId)
                .HasConstraintName("FK__Attendanc__event__0880433F");
        });

        modelBuilder.Entity<Club>(entity =>
        {
            entity.HasKey(e => e.ClubId).HasName("PK__Club__BCAD3DD90E16358F");

            entity.ToTable("Club");

            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.ClubContact)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("club_contact");
            entity.Property(e => e.ClubCreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("club_createdAt");
            entity.Property(e => e.ClubDepartment)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("club_department");
            entity.Property(e => e.ClubEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("club_email");
            entity.Property(e => e.ClubName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("club_name");
            entity.Property(e => e.ClubUpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("club_updatedAt");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__Event__2370F727E629DD51");

            entity.ToTable("Event");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.EventAmount)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("event_amount");
            entity.Property(e => e.EventCategory)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("event_category");
            entity.Property(e => e.EventDate).HasColumnName("event_date");
            entity.Property(e => e.EventDescription)
                .HasColumnType("text")
                .HasColumnName("event_description");
            entity.Property(e => e.EventEligibility)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("event_eligibility");
            entity.Property(e => e.EventEndTime).HasColumnName("event_end_time");
            entity.Property(e => e.EventMode)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("event_mode");
            entity.Property(e => e.EventName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("event_name");
            entity.Property(e => e.EventNoOfSeats).HasColumnName("event_no_of_seats");
            entity.Property(e => e.EventPaid)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasColumnName("event_paid");
            entity.Property(e => e.EventQr).HasColumnName("event_qr");
            entity.Property(e => e.EventStartTime).HasColumnName("event_start_time");
            entity.Property(e => e.EventStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("event_status");
            entity.Property(e => e.EventVenue)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("event_venue");
            entity.Property(e => e.OrgId).HasColumnName("org_id");

            entity.HasOne(d => d.Org).WithMany(p => p.Events)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK__Event__org_id__7EF6D905");
        });

        modelBuilder.Entity<EventRegistration>(entity =>
        {
            entity.HasKey(e => e.EventRegId).HasName("PK__Event_Re__117515140124FB22");

            entity.ToTable("Event_Registration");

            entity.Property(e => e.EventRegId).HasColumnName("event_reg_id");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.PaymentScreenshot).HasColumnName("payment_screenshot");
            entity.Property(e => e.StudentId)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("student_id");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("transaction_id");

            entity.HasOne(d => d.Event).WithMany(p => p.EventRegistrations)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK__Event_Reg__event__02C769E9");

            entity.HasOne(d => d.Student).WithMany(p => p.EventRegistrations)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Event_Reg__stude__03BB8E22");
        });

        modelBuilder.Entity<Organisation>(entity =>
        {
            entity.HasKey(e => e.OrgId).HasName("PK__Organisa__F6AD801253264259");

            entity.ToTable("Organisation");

            entity.Property(e => e.OrgId).HasColumnName("org_id");
            entity.Property(e => e.ClubId).HasColumnName("club_id");
            entity.Property(e => e.OrgContact)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("org_contact");
            entity.Property(e => e.OrgDepartment)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("org_department");
            entity.Property(e => e.OrgEmail)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("org_email");
            entity.Property(e => e.OrgName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("org_name");
            entity.Property(e => e.OrgNoOfEvents).HasColumnName("org_no_of_events");
            entity.Property(e => e.OrgPassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("org_password");
            entity.Property(e => e.OrgRole)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("org_role");

            entity.HasOne(d => d.Club).WithMany(p => p.Organisations)
                .HasForeignKey(d => d.ClubId)
                .HasConstraintName("FK__Organisat__club___7B264821");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Prn).HasName("PK__Student__C5732E11041F5F09");

            entity.ToTable("Student");

            entity.Property(e => e.Prn)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("PRN");
            entity.Property(e => e.Batch)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.Contact)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Department)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Div)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserCredential>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User_Cre__B9BE370F879D2DF5");

            entity.ToTable("User_Credential");

            entity.HasIndex(e => e.EmailId, "UQ__User_Cre__87355E73B760BF25").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.EmailId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("emailId");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
