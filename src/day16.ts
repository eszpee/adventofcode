import { readInputArray } from "./inputfile";
import { inspect } from 'util';
let inputArray:string[] = ['2052ED9802D3B9F465E9AE6003E52B8DEE3AF97CA38100957401A88803D05A25C1E00043E1545883B397259385B47E40257CCEDC7401700043E3F42A8AE0008741E8831EC8020099459D40994E996C8F4801CDC3395039CB60E24B583193DD75D299E95ADB3D3004E5FB941A004AE4E69128D240130D80252E6B27991EC8AD90020F22DF2A8F32EA200AC748CAA0064F6EEEA000B948DFBED7FA4660084BCCEAC01000042E37C3E8BA0008446D8751E0C014A0036E69E226C9FFDE2020016A3B454200CBAC01399BEE299337DC52A7E2C2600BF802B274C8848FA02F331D563B3D300566107C0109B4198B5E888200E90021115E31C5120043A31C3E85E400874428D30AA0E3804D32D32EED236459DC6AC86600E4F3B4AAA4C2A10050336373ED536553855301A600B6802B2B994516469EE45467968C016D004E6E9EE7CE656B6D34491D8018E6805E3B01620C053080136CA0060801C6004A801880360300C226007B8018E0073801A801938004E2400E01801E800434FA790097F39E5FB004A5B3CF47F7ED5965B3CF47F7ED59D401694DEB57F7382D3F6A908005ED253B3449CE9E0399649EB19A005E5398E9142396BD1CA56DFB25C8C65A0930056613FC0141006626C5586E200DC26837080C0169D5DC00D5C40188730D616000215192094311007A5E87B26B12FCD5E5087A896402978002111960DC1E0004363942F8880008741A8E10EE4E778FA2F723A2F60089E4F1FE2E4C5B29B0318005982E600AD802F26672368CB1EC044C2E380552229399D93C9D6A813B98D04272D94440093E2CCCFF158B2CCFE8E24017CE002AD2940294A00CD5638726004066362F1B0C0109311F00424CFE4CF4C016C004AE70CA632A33D2513004F003339A86739F5BAD5350CE73EB75A24DD22280055F34A30EA59FE15CC62F9500'];

interface AssArray{
    [key: string]: any;
}; 

const hexLookup:AssArray = {
    '0' : '0000',
    '1' : '0001',
    '2' : '0010',
    '3' : '0011',
    '4' : '0100',
    '5' : '0101',
    '6' : '0110',
    '7' : '0111',
    '8' : '1000',
    '9' : '1001',
    'A' : '1010',
    'B' : '1011',
    'C' : '1100',
    'D' : '1101',
    'E' : '1110',
    'F' : '1111',
};

function hex2bin(s:string):string {
    return s.split('').map(chr => hexLookup[chr]).join('');
}

function bin2dec(s:string):number {
    return parseInt(s,2);
}

function decodeDataPacket():string {
    let returnNumber = '';
    while(readNBits(1) == '1') {
        returnNumber += readNBits(4);
    }
    returnNumber += readNBits(4);
    return returnNumber;
}

function readNBits(n:number):string {
    if (pointer > binInput.length) {
        throw('POINTER OVERFLOW');
    }
    let rValue = binInput.slice(pointer,pointer+n).join('');
    pointer += n;
    return rValue;

}

function decodePacket(padding:boolean):AssArray {
    const packetVersion = bin2dec(readNBits(3));
    const typeID =  bin2dec(readNBits(3));
    versionSum+=packetVersion;
    let numberLiteral = 0;

    if (typeID == 4) {
        let numberBin = decodeDataPacket();
        numberLiteral = bin2dec(numberBin);
        if (padding) { //rounding bits
            if (pointer % 4 != 0) {pointer += (4 - pointer%4)};
        } 
    }        
    else {
        let subPackets = [];
        const lengthTypeID = readNBits(1);
        if (lengthTypeID == '0') {
            let totalLength:number = bin2dec(readNBits(15));
            let targetPointer = pointer+totalLength;
            while (pointer < targetPointer) {
                subPackets.push(decodePacket(false));
            }        
        }
        else { //lengthTypeID == 1
            const numberOfSubpackets:number = bin2dec(readNBits(11));
            for (let subP = 1; subP <= numberOfSubpackets; subP++) {
                subPackets.push(decodePacket(false));
            }
        }
        if (typeID == 0) {
            console.log("SUM", subPackets);
            let sum = 0;
            subPackets.forEach(packet => {
                sum += parseInt(packet.value,10);
            });
            numberLiteral = sum;
        }
        if (typeID == 1) {
            console.log("PROD", subPackets);
            let prod = 1;
            subPackets.forEach(packet => {
                prod = prod * parseInt(packet.value,10);
            });
            numberLiteral = prod;
        }
        if (typeID == 2) {
            console.log("MIN", subPackets);
            let min = Infinity;
            subPackets.forEach(packet => {
                if (parseInt(packet.value,10)<min) {min = parseInt(packet.value,10)};
            });
            numberLiteral = min;
        }
        if (typeID == 3) {
            console.log("MAX", subPackets);
            let max = 0;
            subPackets.forEach(packet => {
                if (parseInt(packet.value,10)>max) {max = parseInt(packet.value,10)};
            });
            numberLiteral = max;
        }
        if (typeID == 5) {
            console.log("GRE", subPackets);
            if ((parseInt(subPackets[0].value,10)) > (parseInt(subPackets[1].value,10))) {
                numberLiteral = 1;
            }
            else {
                numberLiteral = 0;
            }
        }
        if (typeID == 6) {
            console.log("LES", subPackets);
            if ((parseInt(subPackets[0].value,10)) < (parseInt(subPackets[1].value,10))) {
                numberLiteral = 1;
            }
            else {
                numberLiteral = 0;
            }
        }
        if (typeID == 7) {
            console.log("EQU", subPackets);
            if (subPackets[0].value === subPackets[1].value) {
                numberLiteral = 1;
            }
            else {
                numberLiteral = 0;
            }
        }
    }   

    let packet:AssArray = {
        'version' : packetVersion,
        'typeID': typeID,
        'value': numberLiteral,
        'subPackets': subPackets
    };
    return packet;

}

const binInput = hex2bin(inputArray[0]).split('');
let pointer = 0;
let versionSum = 0;
let subPackets = decodePacket(true);
console.log(inspect(subPackets,{depth:Infinity,colors:true}));
console.log(`Version sum: ${versionSum}`);
console.log(`Value: ${subPackets.value}`);


