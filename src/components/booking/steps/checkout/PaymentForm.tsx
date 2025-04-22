
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardTypeSelect, CARD_TYPES, CardType } from "./CardTypeSelect";
import { CreditCard } from "lucide-react";

// Field validation helpers
function isValidCardNumber(number: string, type: CardType) {
  const digits = number.replace(/\D/g, "");
  if (type === "amex") return digits.length === 15;
  return digits.length === 16;
}
function isValidExpiry(expiry: string) {
  // MM/YY or MMYY
  if (!/^\d{2}\/?\d{2}$/.test(expiry)) return false;
  const [mm, yy] = expiry.includes("/") ? expiry.split("/") : [expiry.slice(0,2), expiry.slice(2)];
  const month = parseInt(mm, 10);
  const year = parseInt(`20${yy}`);
  const now = new Date();
  if (month < 1 || month > 12) return false;
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) return false;
  return true;
}
function isValidCVC(cvc: string, type: CardType) {
  if (!/^\d+$/.test(cvc)) return false;
  return type === "amex" ? cvc.length === 4 : cvc.length === 3;
}

const PaymentForm = () => {
  const [cardType, setCardType] = useState<CardType>("visa");
  const [fields, setFields] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });
  const [touched, setTouched] = useState<{[k: string]: boolean}>({});
  const [errors, setErrors] = useState<{[k: string]: string}>({});

  // Validate fields on change or blur
  const validate = (field?: string) => {
    let newErrors: {[k: string]: string} = {};
    if (!fields.cardName) newErrors.cardName = "Cardholder name required";
    if (!isValidCardNumber(fields.cardNumber, cardType)) {
      newErrors.cardNumber = cardType === "amex" ? "15 digits required (Amex)" : "16 digits required";
    }
    if (!isValidExpiry(fields.expiry)) newErrors.expiry = "Invalid expiry (MM/YY)";
    if (!isValidCVC(fields.cvc, cardType)) newErrors.cvc = cardType === "amex" ? "4 digits required" : "3 digits required";
    if (field) setErrors(errs => ({...errs, [field]: newErrors[field] || ""}));
    else setErrors(newErrors);
    return newErrors;
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFields(prev => ({...prev, [id]: value}));
    if (touched[id]) validate(id);
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setTouched(prev => ({...prev, [id]: true}));
    validate(id);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <CreditCard size={20} className="text-hotel-primary" /> Payment Information
      </h3>
      {/* Card Type Dropdown */}
      <div className="mb-2">
        <Label htmlFor="cardType">Card Type</Label>
        <div className="mt-1">
          <CardTypeSelect value={cardType} onChange={setCardType} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            placeholder="Name on card"
            value={fields.cardName}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            className={errors.cardName && touched.cardName ? "border-red-500" : ""}
            required
            autoComplete="cc-name"
          />
          {errors.cardName && touched.cardName && (
            <span className="text-xs text-red-500">{errors.cardName}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder={cardType === "amex" ? "•••• •••••• •••••" : "•••• •••• •••• ••••"}
            value={fields.cardNumber}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            className={errors.cardNumber && touched.cardNumber ? "border-red-500" : ""}
            maxLength={cardType === "amex" ? 15 : 16}
            inputMode="numeric"
            pattern="\d*"
            autoComplete="cc-number"
            required
          />
          {errors.cardNumber && touched.cardNumber && (
            <span className="text-xs text-red-500">{errors.cardNumber}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={fields.expiry}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            className={errors.expiry && touched.expiry ? "border-red-500" : ""}
            maxLength={5}
            inputMode="numeric"
            autoComplete="cc-exp"
            required
          />
          {errors.expiry && touched.expiry && (
            <span className="text-xs text-red-500">{errors.expiry}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder={cardType === "amex" ? "4 digits" : "3 digits"}
            value={fields.cvc}
            onChange={handleFieldChange}
            onBlur={handleBlur}
            className={errors.cvc && touched.cvc ? "border-red-500" : ""}
            maxLength={cardType === "amex" ? 4 : 3}
            inputMode="numeric"
            autoComplete="cc-csc"
            required
          />
          {errors.cvc && touched.cvc && (
            <span className="text-xs text-red-500">{errors.cvc}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
