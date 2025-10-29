'use client'
import Xarrow from "react-xarrows"
import Image from "next/image"
import { useEffect, useState } from "react"
import os from 'os';
import MovingDiv from "./MovingDiv";
const page = () => {
    const [deviceName,setDeviceName] = useState("")
    const [buttonClicked,setButtonClicked] = useState(false)
    const [privateIP,setPrivateIP] = useState("")
    const [publicIP,setPublicIP] = useState("")
    const [privatePort,setPrivatePort] = useState("")
    const [destIP,setDestIP] = useState("")
    const [destPort,setDestPort] = useState("")
    const [publicPort,setPublicPort] = useState("")
    const [loading,setLoading] = useState(false)
    async function fetchData() {
        const data = await fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
        const ip = data.ip
        return ip
    }
    useEffect(() => {
        setLoading(true)
        setDeviceName(os.hostname())
        const a = `192.168.1.${Math.floor(Math.random() * 254) + 1}`
        setPrivateIP("172.27.192.1")
        const b = Math.floor(Math.random() * 10000) + 450
        setPrivatePort(b)
        const c = Math.floor(Math.random() * 10000) + 437
        setPublicPort(c)
        const d = Math.floor(Math.random() * 10000) + 753
        setDestPort(d)
        const e = `${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`
        setDestIP(e)
        fetchData()
        .then(ip => {
            setPublicIP(ip)
        }).then(
        setLoading(false))
    },[])
    const [completed,setCompleted] = useState(false)
    const [name,setName] = useState("")
    const logoURL = name ? `https://logo.clearbit.com/${name.toLowerCase().replace(/\s+/g,"")}.com` : null
    const [err,setErr] = useState("")
    const [display,setDisplay] = useState(false)
    const handleName = (Name) => {
        if(Name.trim() === "" || Name.trim().length === 0){
            setErr("Enter a company name!")
        }
        else{
            setErr("")
        }
    }
    const handleSubmit = () => {
        if(name === ""){
            setErr("Enter a company name!")
            return
        }
        setErr("")
        setDisplay(true)
    }
  return (
    <>
    <div className="p-5">
        <p className="text-6xl mb-5 text-center font-sans font-semibold flex flex-col justify-center items-center mx-auto select-none">Network Address Translation Simulator</p>
        <p className="text-gray-500 text-center font-sans text-xl select-none">This interactive application simulates the behavior of a Network Address Translation (NAT) router in a visually engaging way. When a user enters a company name, the system initiates a request to fetch the company's official logo from a remote server. The request seamlessly passes through a NAT-enabled router, which dynamically translates private IP addresses into public ones, mimicking real-world internet communication.</p>
        <div className="grid grid-cols-[1fr_1fr_1fr] mt-25 justify-center items-center">
            <div className="text-center flex flex-col justify-center">
                <div className="flex flex-col">
                    <p className="text-2xl font-semibold text-left">{deviceName}</p>
                    <p className="text-xl font-medium text-left">Private IP: {privateIP}</p>
                    <p className="text-xl font-medium text-left">Private Port: {privatePort}</p>
                    <Image 
                    className="select-none"
                    src={"/client.png"}
                    alt="Client"
                    id="client1"
                    width={200}
                    height={200}
                    />
                    <div className="flex flex-row gap-x-2 font-sans">
                        <input 
                        value={name}
                        onChange={e => {setName(e.target.value); setDisplay(false); handleName(e.target.value); setButtonClicked(false)}}
                        className="border rounded-4xl px-3 py-1 placeholder:text-[10px]"
                        placeholder="Company name [unabbreviated version].."
                        />
                        <button onClick={() => {handleSubmit(); setButtonClicked(true)}} className="py-1 px-3 cursor-pointer font-sans bg-blue-800 hover:bg-blue-950 transition duration-300 ease-in-out  rounded-4xl text-white">Fetch</button>
                    </div>
                    <p className="text-red-500 text-md text-left">{err}</p>
                    {
                        completed && display && 
                        <>
                        <div className="flex flex-col mt-3">
                            <p className="text-left mb-2">Fetched {name} Logo</p>
                            <Image
                            className="ml-7"
                            src={logoURL}
                            width={100}
                            height={100}
                            alt={`${name} logo`}
                            />
                        </div>
                        </>
                    }
                </div> 
                <Image 
                className="select-none"
                src={"/client.png"}
                alt="Client"
                id="client2"
                width={200}
                height={200}
                />
                <Image 
                className="select-none"
                src={"/client.png"}
                alt="Client"
                id="client3"
                width={200}
                height={200}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Image 
                className="select-none"
                src={"/router.png"}
                alt="NATed Router"
                id="router"
                width={200}
                height={200}
                />
                <p className="font-sans font-semibold text-3xl mb-5">NATed Router</p>
                <table className="font-sans">
                    <thead>
                        <tr>
                            <th className="bg-blue-200 py-2 px-4 border border-black">Private IP</th>
                            <th className="bg-blue-200 py-2 px-4 border border-black">Private Port</th>
                            <th className="bg-blue-200 py-2 px-4 border border-black">Public IP</th>
                            <th className="bg-blue-200 py-2 px-4 border border-black">Public Port</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black py-2 px-2 text-center">{"172.27.192.1"}</td>
                            <td className="border border-black py-2 px-2 text-center">{privatePort}</td>
                            <td className="border border-black py-2 px-2 text-center">{publicIP}</td>
                            <td className="border border-black py-2 px-2 text-center">{publicPort}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div
                className="flex flex-col"
                >
                 <Image
                className="select-none"
                src={"/server.png"}
                alt="Clearbit Server"
                id="server1"
                width={200}
                height={200}
                />   
                <p className="text-2xl font-semibold text-center">ClearBit Server</p>
                <p className="text-xl font-medium text-center">Destination IP: {destIP}</p>
                <p className="text-xl font-medium text-center">Destination Port: {destPort}</p>
                </div>
                <Image
                className="select-none"
                src={"/server.png"}
                alt="Clearbit Server"
                id="server2"
                width={200}
                height={200}
                />
                <Image
                className="select-none"
                src={"/server.png"}
                alt="Clearbit Server"
                id="server3"
                width={200}
                height={200}
                />
            </div>
            <Xarrow 
            id={"arrow1"}
            start={"client1"}
            end={"router"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color={buttonClicked ? `blue` : `black`}
            />
            <Xarrow 
            start={"client2"}
            end={"router"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color="black"
            />
            <Xarrow 
            start={"client3"}
            end={"router"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color="black"
            />
            <Xarrow 
            start={"router"}
            end={"server1"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color={buttonClicked ? `blue` : `black`}
            />
            <Xarrow 
            start={"router"}
            end={"server2"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color="black"
            />
            <Xarrow 
            start={"router"}
            end={"server3"}
            headShape={"arrow1"}
            tailShape={"arrow1"}
            showHead={true}
            showTail={true}
            color="black"
            />
            <MovingDiv 
            onCycleComplete={setCompleted} 
            buttonClicked={buttonClicked}
            privateIP={privateIP}
            privatePort={privatePort}
            publicIP={publicIP}
            publicPort={publicPort}
            destIP={destIP}
            destPort={destPort}
            />
        </div>
    </div>
    {
        loading && 
        <>
        <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                <div className="mx-auto font-mono font-bold text-3xl">
                    Loading...
                </div>
        </div>
        </>
    }
    </>
  )
}

export default page