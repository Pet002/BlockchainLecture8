import { useState, useEffect } from "react";
import Web3 from "web3";
import { abi } from "./abiContract.abi";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Box, Button, Paper, Stack, styled } from "@mui/material";
import Tanjiro from "./image/Tanjiro-Kamado.jpg";
import Muzan from "./image/Muzan-Kibutsuji.jpg";
import Nezuko from "./image/Nezuko-Kamado.jpg";
import Inosuke from "./image/Inosuke-Hashibira.jpg";
import Zenitsu from "./image/Zenitsu-Agatsuma.jpg";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

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
  async function submit(nameOfCharacter: string, price: string) {
    if (contract) {
      // will add name account and Date Time in function
      contract.methods
        .purchase(
          nameOfCharacter,
          account,
          new Date().toLocaleTimeString("en-US")
        )
        .send({ from: account, value: web3?.utils.toWei(price, "ether") }); // in payable will use send method to send eth to smart contract....

      // Liste for the NameAdded event
      contract.once("NameAdded", {}, function (error: any, event: any) {
        if (!error) {
          console.log(event);
          setEventName(event.event);
          setEventArgs(event.returnValues);
        } else {
          console.log(error);
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
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      {/* 
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{ bgcolor: "#cfe8fc", height: "65vh", mt: 5, pt: 2 }}
      >
        {/* <Stack direction="row" spacing={8} justifyContent="center">
          <Item>
            Item 1 <img src={Tanjiro} />
            <div></div>
            <Button
              variant="contained"
              onClick={() => {
                submit("Tanjiro Kamado", "0.003");
              }}
            >
              Buy 0.003 ETH
            </Button>
          </Item>
          <Item>
            Item 2 <img src={Zenitsu} />
          </Item>
          <Item>
            Item 3 <img src={Inosuke} />
          </Item>
          <Item>
            Item 4 <img src={Muzan} />
          </Item>
          <Item>
            Item 5 <img src={Nezuko} />
          </Item>
        </Stack> 

        <Box container>
        
        </Box>

      </Container> */}



<section className="py-10 bg-gray-100">
  <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src={Tanjiro} alt="Hotel Photo" />
          {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">Tanjiro Kamado</h2>
          <p className="mt-1 text-sm text-slate-400">{/**data */}</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">0.003 ETH</p>

            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <AttachMoneyIcon />

              <button className="text-sm" onClick={() => {
                submit("Tanjiro Kamado", "0.003");
              }}>Get This</button>
            </div>
          </div>
        </div>
      </a>
    </article>
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
          {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">4.9</span>
          </div> */}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">The Hilton Hotel</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">$850</p>
   

            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button className="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </a>
    </article>

    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
          {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">The Hilton Hotel</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">$450</p>
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button className="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </a>
    </article>

    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
          {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">The Hilton Hotel</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">$450</p>
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button className="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </a>
    </article>
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <a href="#">
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="Hotel Photo" />
          {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm">Add to cart</button>
          </div> */}
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">The Hilton Hotel</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">$450</p>
            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button className="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </a>
    </article>
    
    
    
    </div>
</section>



      {web3 && <p>Web3.js version: {web3.version}</p>}
      {account && <p>Connected account: {account}</p>}
      {/* <button onClick={submit}>Test Button</button> */}
      <button onClick={listTable}>table</button>
      <p>Event name: {eventName}</p>
      <p>Event arguments: {JSON.stringify(eventArgs)}</p>
    </div>
  );
}

export default App;
