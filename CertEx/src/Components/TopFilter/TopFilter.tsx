// TopFilter.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import ExamCards from "../../Components/ExamCards/ExamCards";


// Define the type for certification level and criticality
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";
type CriticalLevel = "high" | "medium" | "low";

// Define the interface for certification data
interface CertificationData {
  id: number; // Unique identifier for each certification
  provider: string;
  certification_name: string; // Name of the certification
  level: CertificationLevel;
  description: string;
  tags: string[];
  official_link: string;
  critical: CriticalLevel; // Criticality level
}

const TopFilter: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationData[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CertificationData[]>("http://localhost:5000/certifications");
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // State for filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<string | null>(null);

  // Filter the certifications based on user inputs
  const filteredCertifications = certifications.filter((certification) => {
    // Apply search filter
    const matchesSearch = certification.certification_name.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply level filter
    const matchesLevel = !selectedLevel || certification.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  // Sort the filtered certifications
  const sortedCertifications = filteredCertifications.sort((a, b) => {
    if (selectedSortBy === "latest") {
      return b.id - a.id;
    } else if (selectedSortBy === "oldest") {
      return a.id - b.id;
    } else {
      // Add logic for popular sorting (e.g., by views)
      return 0;
    }
  });

  // Render the filtered and sorted certifications
  return (
    <div className="top-filter">
      <TextField
        label="Search for Certification"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value as string)}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Beginner">Beginner</MenuItem>
        <MenuItem value="Intermediate">Intermediate</MenuItem>
        <MenuItem value="Expert">Expert</MenuItem>
      </Select>
      <Select value={selectedSortBy} onChange={(e) => setSelectedSortBy(e.target.value as string)}>
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="popular">Popular</MenuItem>
      </Select>
      <Button variant="contained" onClick={() => { /* Clear filters logic */ }}>
        Clear All
      </Button>

      {/* Map filtered and sorted certifications to ExamCards */}
      <div className="exam-cards">
        {sortedCertifications.map((certification) => (
          <ExamCards key={certification.id} {...certification} />
        ))}
      </div>
    </div>
  );
};

export default TopFilter;
