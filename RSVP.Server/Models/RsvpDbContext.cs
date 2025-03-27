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

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<EventTable> EventTables { get; set; }

    public virtual DbSet<Organization> Organizations { get; set; }

    public virtual DbSet<UserCredential> UserCredentials { get; set; }

    public virtual DbSet<UserTable> UserTables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=LAPTOP-1TJ9KVMG\\SQLEXPRESS;Initial Catalog=RSVP_DB;Integrated Security=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Booking__5DE3A5B10854EB57");

            entity.ToTable("Booking");

            entity.Property(e => e.BookingId).HasColumnName("booking_id");
            entity.Property(e => e.BookedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("booked_at");
            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Event).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK_Booking_Event");

            entity.HasOne(d => d.User).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Booking_User");
        });

        modelBuilder.Entity<EventTable>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__EventTab__2370F727ED11ECB6");

            entity.ToTable("EventTable");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.Capacity).HasColumnName("capacity");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.EventDate).HasColumnName("event_date");
            entity.Property(e => e.EventDescription)
                .HasColumnType("text")
                .HasColumnName("event_description");
            entity.Property(e => e.EventTitle)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("event_title");
            entity.Property(e => e.EventVenue)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("event_venue");
            entity.Property(e => e.OrgId).HasColumnName("org_id");

            entity.HasOne(d => d.Org).WithMany(p => p.EventTables)
                .HasForeignKey(d => d.OrgId)
                .HasConstraintName("FK_Event_Org");
        });

        modelBuilder.Entity<Organization>(entity =>
        {
            entity.HasKey(e => e.OrgId).HasName("PK__Organiza__F6AD80124AA2D012");

            entity.ToTable("Organization");

            entity.HasIndex(e => e.OrgEmail, "UQ__Organiza__73407A92B9400EE5").IsUnique();

            entity.Property(e => e.OrgId).HasColumnName("org_id");
            entity.Property(e => e.OrgEmail)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("org_email");
            entity.Property(e => e.OrgJoining).HasColumnName("org_joining");
            entity.Property(e => e.OrgName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("org_name");
            entity.Property(e => e.OrgPhoneNo)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("org_phone_no");
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

        modelBuilder.Entity<UserTable>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserTabl__CB9A1CFFC13BC4C7");

            entity.ToTable("UserTable");

            entity.HasIndex(e => e.PhoneNo, "UQ__UserTabl__960F17EFD5380D32").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Firstname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("lastname");
            entity.Property(e => e.OrganizationId).HasColumnName("organization_id");
            entity.Property(e => e.PhoneNo)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("phoneNo");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("role");

            entity.HasOne(d => d.Organization).WithMany(p => p.UserTables)
                .HasForeignKey(d => d.OrganizationId)
                .HasConstraintName("FK_User_Organization");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
