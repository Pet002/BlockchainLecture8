import { useState, useEffect } from "react";
import Web3 from "web3";
import { abi } from "./abiContract.abi";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Paper, Stack, styled } from "@mui/material";
import Tanjiro from './image/Tanjiro-Kamado.jpg';
import Muzan from './image/Muzan-Kibutsuji.jpg';
import Nezuko from './image/Nezuko-Kamado.jpg';
import Inosuke from './image/Inosuke-Hashibira.jpg';
import Zenitsu from './image/Zenitsu-Agatsuma.jpg';


declare global {
  interface Window {
    ethereum?: any;
  }
}

interface getError {
  code: number;
  message: string;
}

function App() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [contract, setContract] = useState<any>(null);

  const [eventName, setEventName] = useState<string>("");
  const [eventArgs, setEventArgs] = useState<any>(null);

  useEffect(() => {
    const { ethereum } = window;

    async function connectToWeb3() {
      if (ethereum) {
        const web3Instance = new Web3(ethereum);
        setWeb3(web3Instance);
        try {
          await ethereum.request({ method: "eth_requestAccounts" });
          // Load Account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Load Contract
          const contractInstance = new web3Instance.eth.Contract(
            abi,
            "0xba2143AB82d0B0e2D03b4Cd6B3dDa6Fb9Df6A594"
          );
          setContract(contractInstance);
        } catch (error: any) {
          if (error.code === 4001) {
            console.error("please Connect MetaMask");
          } else {
            console.error(error);
          }
        }
      }
    }

    connectToWeb3();
  }, []);

  function listTable() {
    if (contract) {
      contract.methods.getOwnerCharacter().call((err: any, result: any) => {
        console.table(result);
      });
    }
  }
  async function submit() {
    if (contract) {
      // will add name account and Date Time in function
      contract.methods
        .purchase(
          "Inosuke Hashibira",
          account,
          new Date().toLocaleTimeString("en-US")
        )
        .send({ from: account, value: web3?.utils.toWei("0.002", "ether") }); // in payable will use send method to send eth to smart contract....

      // Liste for the NameAdded event
      contract.once("NameAdded", {}, function (error: any, event: any) {
        if (!error) {
          console.log(event);
          setEventName(event.event);
          setEventArgs(event.returnValues);
        } else {
          console.log(error)
        }
      });

      // Listen purchase Error Event
      contract.once("purchaseError", {}, function (error: any, event: any) {
        if (!error) {
          setEventName(event.event);
          setEventArgs(event.returnValues);
        }
      });
    }
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ bgcolor: '#cfe8fc', height: '65vh', mt: 5, pt: 2 }}>

        <Stack direction="row" spacing={8} justifyContent="center">
          <Item>Item 1 <img src={Tanjiro} /></Item>
          <Item>Item 2 <img src={Zenitsu} /></Item>
          <Item>Item 3 <img src={Inosuke} /></Item>
          <Item>Item 4 <img src={Muzan} /></Item>
          <Item>Item 5 <img src={Nezuko} /></Item>
        </Stack>

      </Container>

      {web3 && <p>Web3.js version: {web3.version}</p>}
      {account && <p>Connected account: {account}</p>}
      <button onClick={submit}>Test Button</button>
      <button onClick={listTable}>table</button>
      <p>Event name: {eventName}</p>
      <p>Event arguments: {JSON.stringify(eventArgs)}</p>
    </div>
  );
}

export default App;
