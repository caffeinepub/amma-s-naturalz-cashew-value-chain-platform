import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Truck } from "lucide-react";
import { useState } from "react";
import Disclaimer from "./Disclaimer";

interface CityData {
  city: string;
  pincode: string;
  state: string;
  freightMin: number;
  freightMax: number;
}

const CITIES: CityData[] = [
  {
    city: "Delhi",
    pincode: "110001",
    state: "Delhi",
    freightMin: 5.5,
    freightMax: 7,
  },
  {
    city: "Mumbai",
    pincode: "400001",
    state: "Maharashtra",
    freightMin: 4,
    freightMax: 5.5,
  },
  {
    city: "Ahmedabad",
    pincode: "380001",
    state: "Gujarat",
    freightMin: 4.5,
    freightMax: 6,
  },
  {
    city: "Bangalore",
    pincode: "560001",
    state: "Karnataka",
    freightMin: 3,
    freightMax: 4.5,
  },
  {
    city: "Hyderabad",
    pincode: "500001",
    state: "Telangana",
    freightMin: 3,
    freightMax: 4.5,
  },
  {
    city: "Chennai",
    pincode: "600001",
    state: "Tamil Nadu",
    freightMin: 2.5,
    freightMax: 3.5,
  },
  {
    city: "Kolkata",
    pincode: "700001",
    state: "West Bengal",
    freightMin: 5,
    freightMax: 6.5,
  },
  {
    city: "Pune",
    pincode: "411001",
    state: "Maharashtra",
    freightMin: 4,
    freightMax: 5.5,
  },
  {
    city: "Nagpur",
    pincode: "440001",
    state: "Maharashtra",
    freightMin: 5,
    freightMax: 6.5,
  },
  {
    city: "Jaipur",
    pincode: "302001",
    state: "Rajasthan",
    freightMin: 5.5,
    freightMax: 7,
  },
  {
    city: "Lucknow",
    pincode: "226001",
    state: "Uttar Pradesh",
    freightMin: 5.5,
    freightMax: 7,
  },
  {
    city: "Indore",
    pincode: "452001",
    state: "Madhya Pradesh",
    freightMin: 4.5,
    freightMax: 6,
  },
];

const GRADES = [
  { grade: "W180", basePrice: 1200 },
  { grade: "W210", basePrice: 1100 },
  { grade: "W240", basePrice: 1000 },
  { grade: "W320", basePrice: 900 },
  { grade: "W450", basePrice: 750 },
  { grade: "Splits", basePrice: 600 },
  { grade: "Butts", basePrice: 550 },
  { grade: "Baby Bits", basePrice: 400 },
  { grade: "Granules", basePrice: 350 },
];

interface CalcResult {
  city: CityData;
  grade: string;
  qty: number;
  basePrice: number;
  freightMin: number;
  freightMax: number;
  totalFreightMin: number;
  totalFreightMax: number;
  deliveredMin: number;
  deliveredMax: number;
}

export default function DeliveryCalculator() {
  const [grade, setGrade] = useState("");
  const [qty, setQty] = useState(500);
  const [cityName, setCityName] = useState("");
  const [pinFilter, setPinFilter] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);

  const filteredCities = CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(pinFilter.toLowerCase()) ||
      c.pincode.includes(pinFilter) ||
      c.state.toLowerCase().includes(pinFilter.toLowerCase()),
  );

  const calculate = () => {
    const cityData = CITIES.find((c) => c.city === cityName);
    const gradeData = GRADES.find((g) => g.grade === grade);
    if (!cityData || !gradeData) return;

    setResult({
      city: cityData,
      grade,
      qty,
      basePrice: gradeData.basePrice,
      freightMin: cityData.freightMin,
      freightMax: cityData.freightMax,
      totalFreightMin: Math.round(cityData.freightMin * qty),
      totalFreightMax: Math.round(cityData.freightMax * qty),
      deliveredMin: Math.round(
        (gradeData.basePrice + cityData.freightMin) * qty,
      ),
      deliveredMax: Math.round(
        (gradeData.basePrice + cityData.freightMax) * qty,
      ),
    });
  };

  const sendToWhatsApp = () => {
    if (!result) return;
    const msg = `*Pan India Kernel Delivery Enquiry*
From: Amma's Naturalz – SBZ Enterprises, Palakkad, Kerala

*Kernel Grade:* ${result.grade}
*Quantity:* ${result.qty.toLocaleString("en-IN")} kg
*Delivery City:* ${result.city.city}, ${result.city.state} (${result.city.pincode})

*Estimated Freight:* ₹${result.freightMin}–₹${result.freightMax}/kg
*Total Freight:* ₹${result.totalFreightMin.toLocaleString("en-IN")}–₹${result.totalFreightMax.toLocaleString("en-IN")}
*Base Kernel Price (approx):* ₹${result.basePrice}/kg
*Estimated Delivered Cost:* ₹${result.deliveredMin.toLocaleString("en-IN")}–₹${result.deliveredMax.toLocaleString("en-IN")} total

I would like to discuss actual pricing and availability.`;

    window.open(
      `https://wa.me/919188520881?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-forest mb-1">
        Calculator 4: Pan India Kernel Delivery
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-6">
        Estimate kernel landed cost at major Indian cities from Palakkad,
        Kerala.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">Kernel Grade</Label>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger data-ocid="calc4.grade.select">
              <SelectValue placeholder="Select grade..." />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((g) => (
                <SelectItem key={g.grade} value={g.grade}>
                  {g.grade} — ₹{g.basePrice}/kg
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">Quantity (kg)</Label>
          <Input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            data-ocid="calc4.quantity.input"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">
            Search City / Pincode
          </Label>
          <Input
            placeholder="Type city or pincode..."
            value={pinFilter}
            onChange={(e) => setPinFilter(e.target.value)}
            data-ocid="calc4.pincode.search_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="font-ui text-xs font-semibold">Delivery City</Label>
          <Select value={cityName} onValueChange={setCityName}>
            <SelectTrigger data-ocid="calc4.city.select">
              <SelectValue placeholder="Select city..." />
            </SelectTrigger>
            <SelectContent>
              {filteredCities.map((c) => (
                <SelectItem key={c.city} value={c.city}>
                  {c.city}, {c.state} ({c.pincode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        className="bg-forest hover:bg-forest-dark text-white font-ui font-bold"
        onClick={calculate}
        disabled={!grade || !cityName}
        data-ocid="calc4.calculate.primary_button"
      >
        <Truck className="w-4 h-4 mr-2" />
        Calculate Delivery Cost →
      </Button>

      {result && (
        <div className="mt-8 space-y-4" data-ocid="calc4.results.section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-forest/8 rounded-xl p-4">
              <div className="font-ui text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Freight Range
              </div>
              <div className="font-display text-xl font-bold text-forest">
                ₹{result.freightMin}–₹{result.freightMax}/kg
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1">
                From Palakkad to {result.city.city}
              </div>
            </div>
            <div className="bg-gold-light/40 rounded-xl p-4">
              <div className="font-ui text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Total Freight
              </div>
              <div className="font-display text-xl font-bold text-gold-dark">
                ₹{result.totalFreightMin.toLocaleString("en-IN")}–
                {result.totalFreightMax.toLocaleString("en-IN")}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1">
                For {result.qty.toLocaleString("en-IN")} kg
              </div>
            </div>
            <div className="bg-muted rounded-xl p-4">
              <div className="font-ui text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Kernel Base Price
              </div>
              <div className="font-display text-xl font-bold text-foreground">
                ₹{result.basePrice}/kg
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1">
                Approx. {result.grade} market price
              </div>
            </div>
            <div className="bg-terracotta/10 rounded-xl p-4">
              <div className="font-ui text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Delivered Cost (Est.)
              </div>
              <div className="font-display text-xl font-bold text-terracotta">
                ₹{result.deliveredMin.toLocaleString("en-IN")}–
                {result.deliveredMax.toLocaleString("en-IN")}
              </div>
              <div className="font-body text-xs text-muted-foreground mt-1">
                Total approximate cost
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="bg-[#25D366] hover:bg-[#1fb855] text-white font-ui font-bold gap-2"
              onClick={sendToWhatsApp}
              data-ocid="calc4.whatsapp.primary_button"
            >
              <MessageCircle className="w-4 h-4" />
              Send Enquiry to WhatsApp
            </Button>
          </div>

          <Disclaimer />
        </div>
      )}
    </div>
  );
}
