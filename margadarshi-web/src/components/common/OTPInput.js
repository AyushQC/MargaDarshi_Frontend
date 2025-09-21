import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const OTPInput = ({ value, onChange, length = 6, disabled = false }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Set initial value if provided
    if (value && value !== otp.join('')) {
      const newOtp = value.split('').slice(0, length);
      while (newOtp.length < length) {
        newOtp.push('');
      }
      setOtp(newOtp);
    }
  }, [value, length]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    
    // Allow only single digit
    if (element.value.length > 1) {
      element.value = element.value.slice(-1);
    }
    
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    // Update parent component immediately
    onChange(newOtp.join(''));

    // Move to next input if current field is filled
    if (element.value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        // If current box is empty, move to previous box and clear it
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // If current box has value, clear it
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const pastedOtp = pastedData.replace(/[^0-9]/g, '').split('').slice(0, length);
    
    const newOtp = [...otp];
    pastedOtp.forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
      }
    });
    
    // Fill remaining with empty strings
    for (let i = pastedOtp.length; i < length; i++) {
      newOtp[i] = '';
    }
    
    setOtp(newOtp);
    onChange(newOtp.join(''));
    
    // Focus on the next empty field or last field
    const nextIndex = Math.min(pastedOtp.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleFocus = (index) => {
    // Select all text when focusing
    inputRefs.current[index]?.select();
  };

  return (
    <div className="d-flex justify-content-center gap-2 mb-3">
      {otp.map((digit, index) => (
        <Form.Control
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(ref) => (inputRefs.current[index] = ref)}
          disabled={disabled}
          className="text-center fw-bold"
          style={{
            width: '50px',
            height: '50px',
            fontSize: '24px',
            border: '2px solid #dee2e6',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#0d6efd';
            e.target.style.boxShadow = '0 0 0 0.2rem rgba(13, 110, 253, 0.25)';
            handleFocus(index);
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#dee2e6';
            e.target.style.boxShadow = 'none';
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
