'use client';
import { FaHandHoldingHeart, FaMoneyBillWave } from 'react-icons/fa';

export default function DonatePage() {
  const bankDetails = [
    {
      bank: "BPI",
      accountName: "RCAM - Archdiocesan Shrine of Nuestra Señora Del Perpetuo Socorro",
      altName: "RCAM - NSPS Shrine",
      accountNumber: "000311-0181-59",
      branch: "BPI Retiro, Quezon City"
    }
  ];

  // const eWallets = [
  //   {
  //     name: "GCash",
  //     number: "0912 345 6789",
  //     accountName: "NSPS Parish"
  //   }
  // ];
  
  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Parish</h1>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Your generous donations help us maintain our church, support our community programs, and continue our mission of serving God and our community.
          </p>
        </div>

        {/* Bank Transfer Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaMoneyBillWave className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">Bank Transfer</h2>
          </div>
          <div className="max-w-md mx-auto">
            {bankDetails.map((bank) => (
              <div key={bank.bank} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">{bank.bank}</h3>
                  <div className="space-y-2">
                    <p><span className="font-semibold">Account Name:</span> {bank.accountName}</p>
                    <p><span className="font-semibold">Short Account Name:</span> {bank.altName}</p>
                    <p><span className="font-semibold">Alternat Number:</span> {bank.accountNumber}</p>
                    <p><span className="font-semibold">Branch:</span> {bank.branch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E-Wallet Section
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaMobile className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">E-Wallet</h2>
          </div>
          <div className="max-w-md mx-auto">
            {eWallets.map((wallet) => (
              <div key={wallet.name} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all">
                <div className="card-body">
                  <h3 className="card-title text-xl mb-4">{wallet.name}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p><span className="font-semibold">Account Name:</span> {wallet.accountName}</p>
                      <p><span className="font-semibold">Number:</span> {wallet.number}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-base-100 rounded-lg">
                      <FaQrcode className="text-6xl text-primary mb-2" />
                      <p className="text-sm text-center text-base-content/70">QR Code Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Other Ways to Give */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaHandHoldingHeart className="text-3xl text-primary" />
            <h2 className="text-3xl font-bold">Other Ways to Give</h2>
          </div>
          <div className="card bg-base-200 shadow-lg max-w-2xl mx-auto">
            <div className="card-body">
              <h3 className="card-title text-xl mb-4">In-Person Donations</h3>
              <p className="mb-4">
                You can also give your donations directly at the parish office during office hours or during mass collections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}