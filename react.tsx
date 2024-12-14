import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CutoffData = {
    bsf: {
        general: { male: 117.54686, female: 110.28 },
        ews: { male: 103.83604, female: 95.53 },
        sc: { male: 108.91580, female: 105.34 },
        st: { male: 112.17179, female: 107.51 },
        obc: { male: 114.86815, female: 108.41 },
    },
    cisf: {
        general: { male: 128.33, female: 124.48 },
        ews: { male: 116.67, female: 100 },
        sc: { male: 119.24, female: 113.10 },
        st: { male: 118.72073, female: 118.72 },
        obc: { male: 124.55, female: 121 },
    },
    ar: {
        general: { male: 132.49, female: "NOT FOUND" },
        ews: { male: 119, female: "NOT FOUND" },
        sc: { male: 126.54, female: "NOT FOUND" },
        st: { male: 136.57, female: "NOT FOUND" },
        obc: { male: 128.63, female: "NOT FOUND" },
    },
    crpf: {
        general: { male: 116.56, female: 123.45 },
        ews: { male: 106, female: null },
        sc: { male: 108.9, female: 112.11 },
        st: { male: 109.63, female: null },
        obc: { male: 114.36, female: 120 },
    },
    itbp: {
        general: { male: 121, female: 112.12 },
        ews: { male: 106, female: 92 },
        sc: { male: 116.5, female: 105.96 },
        st: { male: 116.3, female: 114.71 },
        obc: { male: 120.11, female: 109.46 },
    },
    ssb: {
        general: { male: 136.36, female: "NOT FOUND" },
        ews: { male: 121.88, female: "NOT FOUND" },
        sc: { male: 129.7, female: "NOT FOUND" },
        st: { male: 128.1, female: "NOT FOUND" },
        obc: { male: 132.7, female: "NOT FOUND" },
    },
};

const SscGdCutoffFinder = () => {
    const [selectedOrg, setSelectedOrg] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const getCutoffValue = () => {
        if (!selectedOrg || !selectedCategory || !selectedGender) return null;
        
        const value = CutoffData[selectedOrg]?.[selectedCategory]?.[selectedGender];
        return value ?? "Not Available";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
            <Card className="w-full max-w-md h-[650px] flex flex-col shadow-2xl">
                <CardHeader className="bg-indigo-600 text-white rounded-t-xl">
                    <CardTitle className="text-2xl font-bold text-center">
                        SSC GD Cutoff Finder
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-4">
                        {/* Organization Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Organization
                            </label>
                            <Select onValueChange={setSelectedOrg}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose Organization" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(CutoffData).map((org) => (
                                        <SelectItem key={org} value={org}>
                                            {org.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Category
                            </label>
                            <Select 
                                onValueChange={setSelectedCategory}
                                disabled={!selectedOrg}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectedOrg && Object.keys(CutoffData[selectedOrg]).map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Gender Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Gender
                            </label>
                            <Select 
                                onValueChange={setSelectedGender}
                                disabled={!selectedOrg || !selectedCategory}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {selectedOrg && selectedCategory && 
                                        Object.keys(CutoffData[selectedOrg][selectedCategory])
                                        .filter(gender => 
                                            CutoffData[selectedOrg][selectedCategory][gender] !== null &&
                                            CutoffData[selectedOrg][selectedCategory][gender] !== "NOT FOUND"
                                        )
                                        .map((gender) => (
                                            <SelectItem key={gender} value={gender}>
                                                {gender.toUpperCase()}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Result Display */}
                    <div className="flex-grow flex items-end">
                        {selectedOrg && selectedCategory && selectedGender && (
                            <div className="w-full bg-indigo-50 p-4 rounded-lg text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Cutoff Score
                                </h3>
                                <div className="text-2xl font-bold text-indigo-600 flex justify-center items-center gap-2">
                                    <span className="text-sm text-gray-600">
                                        {`${selectedOrg.toUpperCase()} - ${selectedCategory.toUpperCase()} - ${selectedGender.toUpperCase()}`}
                                    </span>
                                    <span>{getCutoffValue()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SscGdCutoffFinder;
