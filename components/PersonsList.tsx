'use client';

import { useState } from 'react';
import DeletePersonButton from './DeletePersonButton';

interface Person {
  id: number;
  name: string;
  job_title?: string;
  org_name?: string;
  primary_email?: string;
  phone?: Array<{ value: string }>;
  owner_name: string;
  add_time: string;
  update_time: string;
  company_id: number;
  active_flag: boolean;
  open_deals_count: number;
  closed_deals_count: number;
  activities_count: number;
  followers_count: number;
  picture_id?: {
    pictures: {
      '128': string;
    };
  };
}

interface PersonsListProps {
  initialPersons: Person[];
}

export default function PersonsList({ initialPersons }: PersonsListProps) {
  const [persons, setPersons] = useState<Person[]>(initialPersons);

  const handleDelete = (personId: number) => {
    setPersons(prevPersons => prevPersons.filter(person => person.id !== personId));
  };

  if (!persons || persons.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No persons found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by connecting your Pipedrive account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {persons.map((person) => (
        <div key={person.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-4">
            {person.picture_id?.pictures?.['128'] ? (
              <img 
                src={person.picture_id.pictures['128']} 
                alt={person.name}
                className="w-16 h-16 rounded-full ring-2 ring-white shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {person.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-gray-900 truncate">{person.name}</h4>
                <div className="flex items-center space-x-2">
                  {person.active_flag && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                  <span className="text-xs text-gray-500">ID: {person.id}</span>
                  <DeletePersonButton 
                    personId={person.id} 
                    personName={person.name}
                    onDelete={() => handleDelete(person.id)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Job Title:</span> {person.job_title || 'Not specified'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Organization:</span> {person.org_name || 'Not specified'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> 
                    <a href={`mailto:${person.primary_email}`} className="text-blue-600 hover:text-blue-800 ml-1">
                      {person.primary_email || 'Not specified'}
                    </a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> 
                    <a href={`tel:${person.phone?.[0]?.value}`} className="text-blue-600 hover:text-blue-800 ml-1">
                      {person.phone?.[0]?.value || 'Not specified'}
                    </a>
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-600">
                    <span className="font-medium">Owner:</span> {person.owner_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Added:</span> {new Date(person.add_time).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Last Updated:</span> {new Date(person.update_time).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Company ID:</span> {person.company_id}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Open Deals: {person.open_deals_count}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Closed Deals: {person.closed_deals_count}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Activities: {person.activities_count}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Followers: {person.followers_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 