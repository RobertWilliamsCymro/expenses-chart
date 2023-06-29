import React from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { BarChart } from '@/components/BarChart';

export default function Home() {

  return (
    <>
      <title>Frontend Mentor | Expenses chart component</title>
      <main className="flex flex-col w-[375px] sm:w-[600px] my-auto min-h-screen p-6 mx-auto font-dm-sans justify-center">
          <div className="bg-soft-red text-very-pale-orange mb-2 rounded-2xl">
              <div className="flex py-8 ml-8">
                <div className="justify-between">
                  <p className="mb-2">My balance</p>
                  <p className="text-3xl font-bold">$921.48</p>
                </div>
                <Image className="ml-auto mr-8" src={Logo} alt=""></Image>
              </div>
            </div>
          <div className="mt-6 bg-pale-orange rounded-2xl">
            <h1 className="p-8 font-bold text-3xl">Spending - Last 7 Days</h1>
            <div className="px-8">
              <BarChart />
            </div>
            <hr className="h-px w-11/12 mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-900" />
            <div className="flex">
              <div className="justify-between ml-5 sm:ml-12">
              <p className="text-gray-500">Total this month:</p>
              <p className="font-bold text-4xl sm:text-5xl mb-8">$478.33</p>
              </div>
              <div className="ml-auto mr-5 sm:mr-12 mt-5 sm:mt-6">
              <p className="font-bold text-right">+2.4%</p>
              <p className="text-gray-500"> from last month</p>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}
