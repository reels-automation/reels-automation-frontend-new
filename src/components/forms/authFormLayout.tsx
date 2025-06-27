import React from 'react';

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AuthFormLayout = ({ title, children }: AuthFormLayoutProps) => (
  <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="flex flex-col sm:items-center sm:justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white shadow-2xl rounded-xl dark:border md:mt-0 max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  </section>
);