import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/cartUtils';
import khqrService from '../services/khqrService';
import customQR from '../assets/khqr-custom.jpg';
import userQR from '../assets/user-khqr.jpg';

const KHQRPayment = ({ onPaymentSuccess, onCancel }) => {
  console.log('🔧 KHQR Component Props:', { 
    onPaymentSuccess: typeof onPaymentSuccess, 
    onCancel: typeof onCancel 
  });
  
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [merchantInfo, setMerchantInfo] = useState(null);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [amount] = useState(10.00); // Default amount
  const [isVerifying, setIsVerifying] = useState(false);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        console.log('🔄 Initializing KHQR payment with user QR code...');
        setPaymentStatus('loading');
        
        // Fetch merchant info
        console.log('📋 Fetching merchant info...');
        await fetchMerchantInfo();
        
        // Use user's QR code directly instead of generating
        console.log('📱 Using user-provided QR code');
        setQrCode(userQR);
        setPaymentStatus('generated');
        
        // Start countdown
        const countdownTimer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => {
          clearInterval(countdownTimer);
        };
        
      } catch (err) {
        console.error('💥 Error initializing KHQR payment:', err);
        setError('Failed to initialize payment: ' + (err.message || 'Unknown error'));
        setPaymentStatus('error');
      }
    };

    initializePayment();
  }, []); // Remove amount dependency since we're using static QR

  useEffect(() => {
    if (countdown === 0) {
      setError('Payment QR code expired. Please generate a new one.');
      setPaymentStatus('expired');
    }
  }, [countdown]);

  const fetchMerchantInfo = async () => {
    try {
      const info = await khqrService.getMerchantInfo();
      setMerchantInfo(info);
    } catch (err) {
      console.error('Error fetching merchant info:', err);
    }
  };

  const handlePaymentConfirmation = async () => {
    setIsVerifying(true);
    setError(null);
    
    try {
      // Generate transaction ID
      const transactionId = 'KHQR-' + Date.now();
      
      console.log('Verifying payment with transaction ID:', transactionId);
      
      // Call backend to verify payment (in production, this would check with bank API)
      const result = await khqrService.verifyKHQRPayment(transactionId);
      
      console.log('Payment verification result:', result);
      
      if (result.success) {
        console.log('✅ Payment verification successful!');
        console.log('🔔 Calling onPaymentSuccess callback...');
        
        if (typeof onPaymentSuccess === 'function') {
          console.log('✅ onPaymentSuccess is a function, calling it...');
          onPaymentSuccess({
            payment_method: 'khqr',
            payment_status: true,
            transaction_id: transactionId,
          });
          console.log('✅ onPaymentSuccess callback completed');
        } else {
          console.error('❌ onPaymentSuccess is not a function:', typeof onPaymentSuccess);
        }
        
        setPaymentStatus('completed');
      } else {
        setError('Payment verification failed. Please try again.');
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('error');
      setError('Payment verification failed: ' + (error.response?.data?.detail || error.message || 'Unknown error'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setPaymentStatus('loading');
      setError(null);
      
      // Use your QR code again (no need to regenerate)
      console.log('🔄 Refreshing with your QR code...');
      setQrCode(userQR);
      setPaymentStatus('generated');
      setCountdown(300); // Reset countdown to 5 minutes
      
    } catch (error) {
      console.error('Error refreshing QR code:', error);
      setError('Failed to refresh QR code');
      setPaymentStatus('error');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-coffee-800">KHQR Payment</h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error ? (
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleRefresh}
                className="bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded transition duration-300"
              >
                Generate New QR Code
              </button>
            </div>
          ) : (
            <>
              {/* KHQR Header */}
              <div className="bg-red-600 text-white p-4 rounded-t-lg -m-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">KHQR</div>
                  <div className="text-sm">Cambodian QR Code Payment</div>
                </div>
              </div>

              {/* Merchant Info */}
              {merchantInfo && (
                <div className="text-center mb-4">
                  <div className="text-lg font-semibold text-coffee-800">
                    {merchantInfo.merchant_name}
                  </div>
                  <div className="text-sm text-coffee-600">
                    {merchantInfo.merchant_city}, {merchantInfo.country_code}
                  </div>
                </div>
              )}

              {/* QR Code */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  {qrCode ? (
                    <>
                      <img 
                        src={qrCode} 
                        alt="Your KHQR Code" 
                        className="w-64 h-64 mx-auto border-2 border-gray-200 rounded-lg shadow-lg"
                        onError={(e) => {
                          console.error('QR Code image failed to load:', e);
                          // Fallback to static QR if user QR fails
                          e.target.src = customQR;
                        }}
                        onLoad={() => {
                          console.log('✅ Your QR Code loaded successfully');
                        }}
                      />
                      <div className="mt-3 text-sm text-gray-600 bg-green-50 p-2 rounded">
                        ✅ Your personal KHQR code is ready for scanning
                      </div>
                    </>
                  ) : (
                    <div className="w-64 h-64 mx-auto border-2 border-gray-200 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Amount */}
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-coffee-800">
                  {formatCurrency(amount)}
                </div>
                <div className="text-sm text-coffee-600">Payment Amount</div>
              </div>

              {/* Payment Status */}
              <div className="text-center mb-4">
                {paymentStatus === 'generated' && (
                  <div className="text-blue-600">
                    <div className="animate-pulse mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm">Waiting for payment...</p>
                    <p className="text-xs text-gray-500 mt-1">
                      QR code expires in {formatTime(countdown)}
                    </p>
                  </div>
                )}
                
                {paymentStatus === 'completed' && (
                  <div className="text-green-600">
                    <div className="mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm">Payment completed!</p>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-coffee-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-coffee-800 mb-2">How to pay:</h3>
                <ol className="text-sm text-coffee-700 space-y-1">
                  <li>1. Open your banking app (ABA, Wing, Acleda, etc.)</li>
                  <li>2. Scan the QR code above</li>
                  <li>3. Confirm the payment amount: {formatCurrency(amount)}</li>
                  <li>4. Complete the payment in your banking app</li>
                  <li>5. Click "I Have Paid" button below</li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {paymentStatus === 'generated' && (
                  <button
                    onClick={handlePaymentConfirmation}
                    disabled={isVerifying}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded transition duration-300"
                  >
                    {isVerifying ? 'Verifying Payment...' : '✓ I Have Paid'}
                  </button>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleRefresh}
                    className="flex-1 bg-coffee-600 hover:bg-coffee-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Refresh QR Code
                  </button>
                  <button
                    onClick={onCancel}
                    className="flex-1 border border-coffee-300 text-coffee-700 hover:bg-coffee-50 font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KHQRPayment;
