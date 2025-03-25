"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
export const AnalyticDayPicker = ({ currentDay }: { currentDay: number }) => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(currentDay);

  useEffect(() => {
    router.replace(`/dashboard/analytics/${selectedDay}`);
  }, [selectedDay]);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            {selectedDay} Gün <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setSelectedDay(7)}>
            7 Gün
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedDay(14)}>
            14 Gün
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedDay(30)}>
            30 Gün
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedDay(90)}>
            90 Gün
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedDay(180)}>
            180 Gün
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSelectedDay(365)}>
            365 Gün
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
