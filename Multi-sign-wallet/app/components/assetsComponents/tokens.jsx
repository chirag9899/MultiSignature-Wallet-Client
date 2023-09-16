"use client";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import React, { useCallback } from 'react'

const Tokens = () => {
    const renderCell= useCallback((row,columnKey)=>{
        const cellValue= row[columnKey];

        switch(columnKey){
            case "assets":
                return (
                    <div className="flex flex-row gap-2 items-center">
                        <div><img className="w-[30px] h-[30px]" src={row.image} alt=""/></div>
                        <div>{row.assets}</div>
                    </div>
                );
            case "balance":
                return (
                    <div>
                        <p>{row.balance}</p>
                    </div>
                )
            case "value":
                return (
                    <div>
                        <p>{row.value}</p>
                    </div>
                );
            default:
                return cellValue; 
        }
    },[])
    const columns=[
        {
            key:"assets",
            label:"Assets",
        },
        {
            key:"balance",
            label:"Balance"
        },
        {
            key:"value",
            label:"Value"
        }
    ];

    const rows = [
        {
          key: "1",
          assets: "Base Goerli Ether",
          balance: "0.00001bGOR",
          value: "0.000USD",
          image:"https://safe-transaction-assets.safe.global/chains/84531/currency_logo.png"
        },
        
      ];
  return (
    <div>
        <Table aria-label="assets table" isHeaderSticky>
            <TableHeader columns={columns}>
                {(column) => 
                    <TableColumn key={column.key}>
                        {column.label}
                    </TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key}>
                    {(columnKey) => 
                        <TableCell>
                            {renderCell(item, columnKey)}
                        </TableCell>
                    }
                    </TableRow>
        )}
            </TableBody>
        </Table>

    </div>
  )
}

export default Tokens