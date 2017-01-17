﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Basenet.Educase.IdentityManager.DataModel.Data
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class IdentityManagerEntities : DbContext, IIdentityManagerEntities
    {
        public IdentityManagerEntities()
            : base("name=IdentityManagerEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual IDbSet<Account> Accounts { get; set; }
        public virtual IDbSet<Claim> Claims { get; set; }
        public virtual IDbSet<Client> Clients { get; set; }
        public virtual IDbSet<ClientToMandator> ClientToMandators { get; set; }
        public virtual IDbSet<ClientToScope> ClientToScopes { get; set; }
        public virtual IDbSet<Mandator> Mandators { get; set; }
        public virtual IDbSet<Scope> Scopes { get; set; }
        public virtual IDbSet<ScopeToClaim> ScopeToClaims { get; set; }
    }
}