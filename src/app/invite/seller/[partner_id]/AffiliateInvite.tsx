"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as RPNInput from "react-phone-number-input";
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import flags from "react-phone-number-input/flags";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import { ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";

const translations = {
    en: {
        successTitle: "Congratulations! Download the app to start making money.",
        successButton: "Use the app to join!",
        mainTitle: "You're invited to join Jamble as a Seller!",
        countryCodeTitle: "Country Code",
        searchCountries: "Search countries...",
        noCountriesFound: "No countries found.",
        activating: "Activating...",
        activateCredit: "Activate your Account",
        alreadyClaimedTitle: "You've already claimed this reward with this phone number.",
        alreadyClaimedButton: "Open the app"
    },
    pt: {
        successTitle: "Parabéns! Baixe o aplicativo para começar a ganhar dinheiro.",
        successButton: "Use o app para participar!",
        mainTitle: "Você foi convidado para entrar no Jamble como Vendedor!",
        countryCodeTitle: "Código do país",
        searchCountries: "Pesquisar países...",
        noCountriesFound: "Nenhum país encontrado.",
        activating: "Ativando...",
        activateCredit: "Ativar sua Conta",
        alreadyClaimedTitle: "Você já resgatou essa recompensa com este número de telefone.",
        alreadyClaimedButton: "Abrir o app"
    }
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country as RPNInput.Country];
    return (
        <span className="flex h-6 w-8 overflow-hidden rounded-md bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};
  
  const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
    <Input
        className={cn("p-2 rounded-r-2xl rounded-l-none border border-slate-100 border-l-0 h-14 w-full text-xl", className)}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = "InputComponent";
  
type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: Array<{ label: string; value: RPNInput.Country | undefined }>;
    onChange: (country: RPNInput.Country) => void;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    search: string;
    setSearch: (search: string) => void;
    filteredCountries: RPNInput.Country[];
    translations: typeof translations.en;
};
  
const CountrySelectDrawer = ({
    value: selectedCountry,
    onChange,
    drawerOpen,
    setDrawerOpen,
    search,
    setSearch,
    filteredCountries,
    translations,
}: CountrySelectProps) => {
    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
                <div
                    className="p-2 pl-4 rounded-2xl border border-slate-100 flex flex-row justify-center items-center gap-x-1 cursor-pointer rounded-r-none border-r-0"
                    onClick={() => setDrawerOpen(true)}
                >
                    <FlagComponent 
                        country={selectedCountry} 
                        countryName={new Intl.DisplayNames(['en'], { type: 'region' }).of(selectedCountry) || selectedCountry}
                    />
                    <ChevronDown className="w-6 h-6" />
                </div>
            </DrawerTrigger>
            <DrawerContent className="flex flex-col justify-start items-stretch max-h-[80vh]">
                <DrawerTitle className="text-xl px-4 pt-4 text-center mb-6">
                    {translations.countryCodeTitle}
                </DrawerTitle>
    
                <Command className="px-4 pb-4 flex flex-col gap-y-4 flex-1 overflow-y-auto">
                    <CommandInput
                        className="text-[16px]"
                        value={search}
                        onValueChange={setSearch}
                        placeholder={translations.searchCountries}
                    />
        
                    <CommandList>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => {
                        const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
                        const dialCode = getCountryCallingCode(country);
                        return (
                            <CommandItem
                                className="cursor-pointer gap-2 mt-2"
                                key={country}
                                onSelect={() => {
                                    onChange(country);
                                    setDrawerOpen(false);
                                }}
                            >
                                <FlagComponent country={country} countryName={countryName} />
                                <span className="flex-1">{countryName}</span>
                                <CommandShortcut className="font-bold">
                                    +{dialCode}
                                </CommandShortcut>
                            </CommandItem>
                        );
                        })
                    ) : (
                        <CommandEmpty>{translations.noCountriesFound}</CommandEmpty>
                    )}
                    </CommandList>
                </Command>
            </DrawerContent>
        </Drawer>
    );
};
  

export default function AffiliateInvite({
    countryCode,
    partnerId,
    utmCampaign,
}: {
    countryCode: string;
    partnerId?: string;
    utmCampaign?: string;
}) {
    const countryList = getCountries();
    const normalized = (countryCode ||  "").toUpperCase();
    const isValid = countryList.includes(normalized as any) && normalized.length === 2;
    const initialCountry = (isValid ? normalized : "US") as RPNInput.Country;

    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<RPNInput.Country>(initialCountry);
    const [phoneValue, setPhoneValue] = useState<RPNInput.Value>();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isAlreadyClaimed, setIsAlreadyClaimed] = useState(false);

    useEffect(() => {
        if (!countryCode) return;
        const normalized = countryCode.toUpperCase() as RPNInput.Country;
        if (countryList.includes(normalized) && normalized !== selectedCountry) {
            setSelectedCountry(normalized);
        }
    }, [countryCode]);
    const language = countryCode === "BR" ? "pt" : "en";

    const t = translations[language];

    const filteredCountries = countryList.filter((country) => {
        const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
        const dialCode = getCountryCallingCode(country);
        return (
          countryName.toLowerCase().includes(search.toLowerCase()) ||
          dialCode.includes(search) ||
          country.toLowerCase().includes(search.toLowerCase())
        );
      });
  
    async function handleActivateCredit() {
        if (!phoneValue) return;
        setIsLoading(true);

        console.log("partnerId: ", partnerId)
        console.log("subtype: ", utmCampaign)

        try {
            const res = await fetch("https://jamble-backend-test-us-576189464787.us-central1.run.app/profile/create_referral_intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "seller",
                    referrer_id: partnerId,
                    referee_phone_number: phoneValue,
                    subtype: utmCampaign
                }),
            });
            const data = await res.json();

            // if (res.status === 400 && data?.error_code === "PROFILE_REFERRAL_INTENT_ALREADY_EXISTS") {
            //     setIsAlreadyClaimed(true);
            //     return;
            // }

            if (res.status !== 200) {
                setIsAlreadyClaimed(true);
                return;
            }

            if (!data.success) throw new Error(data.message);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-[80vh] p-6 bg-white flex flex-col justify-center items-center gap-y-6">
            <Image src="/logo-jamble.png" alt="Jamble" height={96} width={96} />
            {isAlreadyClaimed ? (
                <>
                    <p className="text-3xl font-bold text-center">{t.alreadyClaimedTitle}</p>
                    <a
                        href="https://lestudioslingshot.fr"
                        className="w-full h-12 rounded-full text-xl bg-[#7E53F8] text-white"
                    >
                        {t.alreadyClaimedButton}
                    </a>
                </>
            ) : isSuccess ? (
                <>
                    <p className="text-3xl font-bold text-center">{t.successTitle}</p>
                    <a href="https://lestudioslingshot.fr" className="w-full h-12 rounded-full text-xl bg-[#7E53F8] text-white">
                        {t.successButton}
                    </a>
                </>
            ) : (
                <>
                    <p className="text-3xl font-bold text-center">{t.mainTitle}</p>
                    <div className="flex flex-row justify-center items-stretch w-full h-14">
                        <CountrySelectDrawer
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            options={countryList.map(country => ({
                                label: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
                                value: country
                            }))}
                            drawerOpen={drawerOpen}
                            setDrawerOpen={setDrawerOpen}
                            search={search}
                            setSearch={setSearch}
                            filteredCountries={filteredCountries}
                            translations={t}
                        />
                        <RPNInput.default
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry={selectedCountry}
                            value={phoneValue}
                            onChange={(value) => setPhoneValue(value || undefined)}
                            country={selectedCountry}
                            onCountryChange={(country) => country && setSelectedCountry(country)}
                            inputComponent={InputComponent}
                            countrySelectComponent={() => null}
                            className="flex-1"
                        />
                    </div>
                    <Button 
                        disabled={!phoneValue || !isValidPhoneNumber(phoneValue) || isLoading} 
                        onClick={handleActivateCredit} 
                        className={cn(
                        "w-full h-12 rounded-full text-xl",
                        !phoneValue || !isValidPhoneNumber(phoneValue) || isLoading 
                            ? "opacity-50 cursor-not-allowed bg-slate-200" 
                            : "bg-[#7E53F8] text-white"
                        )}
                    >
                        {isLoading ? t.activating : t.activateCredit}
                    </Button>
                </>
            )}
        </div>
    );
}