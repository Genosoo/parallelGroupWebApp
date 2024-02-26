/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { baseUrl, getqrCode } from "../../../../../api/api" 

export default function Qrcode({data, handleQRcodeClose }) {
    const personData = data.individual
    console.log('qrcode data', personData)
  return (
    <div className="qrWrapper">
        <h2 className="qrTitle">QR Code</h2>
        <div className="qrCodeProPic">
          <img  src={`${baseUrl}${personData.photo}`} alt="profile picture" />
        </div>
         <h3>{personData.first_name || "--"} {personData.last_name || "--"}</h3>
         <p>{data.username || "--"}</p>
        <div className="qrCodeImage">
            <img src={getqrCode} alt="qr code" />
        </div>

        <button onClick={handleQRcodeClose}>Done</button>
    </div>
  )
}
