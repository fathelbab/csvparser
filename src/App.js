import './App.css';
import CSVReader from 'react-csv-reader';
import { useState, useEffect, useRef } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import enjoyPic from './1test.png';
import uploadPic from './2.jpeg';
import togglePic from './3.jpeg';
function App() {
  const [data, setData] = useState(null);
  const [dataBackup, setDataBackup] = useState(null);
  const [message, setMessage] = useState('');
  const [removeZeroToggle, setRemoveZeroToggle] = useState(false);

 

  const handleUpload = (data) => {
    localStorage.setItem('myData', data);
    setData(data);
  };

  function removeZerosAndPlus(mobileNumber) {
    // Use a regular expression to remove all zeros and plus sign
    const cleanedMobileNumber = mobileNumber.replace(/^[0+]*/g, '');
  
    return cleanedMobileNumber;
  }

  useEffect(() => {
    if (data && removeZeroToggle) {
      setDataBackup(data);
      const newData = data.map((user) => {
        if (removeZeroToggle) {
          const cleanedMobileNumber = removeZerosAndPlus(user[2]);
          return [user[0], user[1], cleanedMobileNumber];
        } else {
          return user;
        }
      })
      setData(newData);
    } else if (dataBackup && !removeZeroToggle) {
      setData(dataBackup);
    }
  }, [removeZeroToggle]);

  return (
    <div className="App">


      <div className="instructions">
        <h2>Instructions:</h2>
        <p>1. Upload your CSV file.</p>
        <p>2. Ensure the second column is the name and the third column is the mobile number.</p>
        <p>3. Enter your message below. (text only for now)</p>
        <p>4. Use the toggle to remove zeros and plus signs.</p>
        <p>5. Click on the name open WhatsApp.</p>
        <p>6. Dont close the browser nor refresh it or else the progress will be lost</p>
        <img className="enjoy-image" src={enjoyPic} alt="enjoy" />
        <p>Enjoy :D</p>
      </div>

      <CSVReader onFileLoaded={handleUpload} />
     { data ? <img className="enjoy-image" src={uploadPic} alt="enjoy" /> : null}

      <div className="components-container">
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </div>

        <div className="toggle-container">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={removeZeroToggle}
              onChange={() => setRemoveZeroToggle(!removeZeroToggle)}
            />
            <span className="slider"></span>
          </label>
          <p>Remove Zeros and Plus: {removeZeroToggle ? "ON" : "OFF"}</p>
        </div>
       {removeZeroToggle ? <img className="enjoy-image" src={togglePic} alt="enjoy" /> : null}

      </div>
      <div className="table-container">
        <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Mobile</th>
      </tr>
    </thead>
    <tbody>
      {data
        ? data.map((user, index) => (
            <tr key={index}>
              <td>
                <div class="cell">
                  <a
                    href={`https://wa.me/send/?phone=${user[2]}&text=${message}&type=phone_number&app_absent=0`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user[1]}
                  </a>
                  <CopyToClipboard class="copy-button" text={user[1]}><span>Copy Name</span></CopyToClipboard>
                </div>
              </td>
              <td>
                <div class="cell">
                  {user[2]}
                  <CopyToClipboard class="copy-button" text={user[2]}><span>Copy Mobile</span></CopyToClipboard>
                </div>
                <a className="save-to-contacts" href={`tel:${user[2]}`}>Save to Contacts</a>

              </td>
            </tr>
          ))
        : null}
    </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
