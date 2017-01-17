using System;
using System.Collections.Generic;
using System.Linq;
using Basenet.Educase.IdentityManager.Facade.Models;
using Basenet.Educase.IdentityManager.Facade.Properties;

namespace Basenet.Educase.IdentityManager.Facade.Validations
{
    public static class UnprocessableEntityValidator
    {
        public static string Validate(Guid mandatorUid, UserAccount account)
        {
            var validationMessages = new List<string>();

            var mandatorUidError = ValidateMandatorUid(mandatorUid);
            if (!string.IsNullOrEmpty(mandatorUidError))
            {
                validationMessages.Add(mandatorUidError);
            }
            
            var accountNameError = ValidateName(account.Name);
            if (!string.IsNullOrEmpty(accountNameError))
            {
                validationMessages.Add(accountNameError);
            }

            var accountIdentifyerError = ValidateIdentifyer(account.Identifier);
            if (!string.IsNullOrEmpty(accountIdentifyerError))
            {
                validationMessages.Add(accountIdentifyerError);
            }

            var maxlengthError = ValidateFirstname(account.Firstname);
            if (!string.IsNullOrEmpty(maxlengthError))
            {
                validationMessages.Add(maxlengthError);
            }

            maxlengthError = ValidateLastname(account.Lastname);
            if (!string.IsNullOrEmpty(maxlengthError))
            {
                validationMessages.Add(maxlengthError);
            }

            maxlengthError = ValidateEmailAddress(account.EmailAddress);
            if (!string.IsNullOrEmpty(maxlengthError))
            {
                validationMessages.Add(maxlengthError);
            }

            var accountValidFromValidToError = ValidateValidFromValidTo(account.ValidFrom, account.ValidTo);
            if (!string.IsNullOrEmpty(accountValidFromValidToError))
            {
                validationMessages.Add(accountValidFromValidToError);
            }

            return validationMessages.Any()
                ? string.Join(Environment.NewLine, validationMessages.ToArray())
                : string.Empty;
        }

        private static string ValidateMandatorUid(Guid mandatoruid)
        {
            return mandatoruid == Guid.Empty ? Resources.The_MandatorUid_can_not_be_empty : string.Empty;
        }

        private static string ValidateName(string name)
        {
            return string.IsNullOrWhiteSpace(name)
                ? Resources.The_account_Name_can_not_be_null_or_empty
                : name.Length > 100 ? Resources.The_account_Name_length_exceed_maximum : string.Empty;
        }

        private static string ValidateIdentifyer(string identifyer)
        {
            return string.IsNullOrWhiteSpace(identifyer)
                ? Resources.The_account_Identifyer_can_not_be_null_or_empty
                : identifyer.Length > 255 ? Resources.The_account_Identifyer_length_exceed_maximum : string.Empty;
        }

        private static string ValidateFirstname(string firstname)
        {
            return firstname != null && firstname.Length > 100 ? Resources.The_account_Firstname_length_exceed_maximum : string.Empty;
        }

        private static string ValidateLastname(string lastname)
        {
            return lastname != null && lastname.Length > 100 ? Resources.The_account_Lastname_length_exceed_maximum : string.Empty;
        }

        private static string ValidateEmailAddress(string emailAddress)
        {
            return emailAddress != null && emailAddress.Length > 255 ? Resources.The_account_EmailAddress_length_exceed_maximum : string.Empty;
        }

        private static string ValidateValidFromValidTo(DateTime? validFrom, DateTime? validTo)
        {
            if (validFrom.HasValue && validTo.HasValue && validFrom.Value > validTo.Value)
            {
                return Resources.The_account_ValidFrom_is_not_allowed_to_be_bigger_than_ValidTo;
            }

            if (!validFrom.HasValue && validTo.HasValue && validTo.Value < DateTime.Today)
            {
                return Resources.The_account_ValidFrom_must_have_value_if_validTo_is_in_the_past;
            }

            return string.Empty;
        }
    }
}
