import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
    change?: number;
}

export function StatsCard({ title, value, icon: Icon, color = "bg-blue-500", change }: StatsCardProps) {
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;

    return (
        <Card className="flex-row items-center justify-between border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div>
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <h3 className="text-2xl font-semibold text-foreground">{value}</h3>
                    {change !== undefined && (
                        <p
                            className={`text-sm font-medium mt-1 ${
                                isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"
                            }`}
                        >
                            {isPositive && "+"}{change}% {isPositive ? "increase" : isNegative ? "decrease" : ""}
                        </p>
                    )}
                </CardContent>
            </div>

            <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
        </Card>
    );
}
export default StatsCard;