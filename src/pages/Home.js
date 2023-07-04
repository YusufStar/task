import ImageSlider from "../components/ImageSlider"
import { Box, Button, Checkbox, Flex, IconButton, Input, NumberInput, NumberInputField, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Tag, TagCloseButton, TagLabel, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import WorldData from "../World.json"
import DateRangePicker from '../components/DateRanger'

const Home = () => {
  const options = [
    { value: 'Home', label: 'Home' },
    { value: 'Residence', label: 'Residence' },
    { value: 'Land', label: 'Land / Farm' },
    { value: 'workplace', label: 'Workplace' },
    { value: 'lake', label: 'Lake' },
  ];
  const [rentorsale, setRentorsale] = useState("rent")
  const [country, setCountry] = useState("Afghanistan")
  const [state, setState] = useState()
  const [room, setRoom] = useState("1+1")
  const [reSale, setreSale] = useState(false)
  const [minMax, setMinMax] = useState([0, 999999])
  const [rating, setRating] = useState(5);
  const [keywords, setKeywords] = useState([]);
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [commerceType, setCommerceType] = useState(["Home"]);

  const handleOptionClick = (optionValue) => {
    if (commerceType.includes(optionValue)) {
      setCommerceType(commerceType.filter((value) => value !== optionValue));
    } else {
      setCommerceType([...commerceType, optionValue]);
    }
  };
  
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1687226014417-b22aaaa288e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=750&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODQ0OTAzNA&ixlib=rb-4.0.3&q=80&w=1920",
    "https://images.unsplash.com/photo-1687226197732-f91552499640?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=750&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODQ0OTA1Nw&ixlib=rb-4.0.3&q=80&w=1920"
  ]

  const handleClear = () => {
    setCommerceType("Home")
    setRentorsale("rent")
    setCountry("")
    setState()
    setRoom("1+1")
    setreSale(false)
    setMinMax([0, 999999])
    setRating(5)
    setKeywords([])
    setSelectedRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ])
  }

  const formatSelectedDate = (range) => {
    if (range.startDate && range.endDate) {
      return `${range.startDate.toDateString()} - ${range.endDate.toDateString()}`;
    } else {
      return "Tarih Seç";
    }
  };

  const handleTabKeyPress = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const keyword = event.target.value.trim();
      if (keyword !== '') {
        setKeywords((prevKeywords) => [...prevKeywords, keyword]);
        event.target.value = '';
      }
    }
  };

  const handleKeywordDelete = (keyword) => {
    setKeywords((prevKeywords) => prevKeywords.filter((k) => k !== keyword));
  };
  const toast = useToast()

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleMinChange = (e) => {
    let newMin = parseInt(e.target.value) || 0;
    let newMax = Math.max(newMin, minMax[1]);

    if (newMin < 0 || newMin > 999999) {
      newMin = Math.max(0, Math.min(newMin, 999999));
      newMax = Math.max(newMin, newMax);
    }

    setMinMax([newMin, newMax]);
  };

  const handleMaxChange = (e) => {
    let newMax = parseInt(e.target.value) || 0;
    let newMin = Math.min(newMax, minMax[0]);

    if (newMax < 0 || newMax > 999999) {
      newMax = Math.max(0, Math.min(newMax, 999999));
      newMin = Math.min(newMax, newMin);
    }

    setMinMax([newMin, newMax]);
  };

  
  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };


  return (
    <div className="h-full flex w-screen flex-col pt-48 px-24 m-auto bg-[#ececec]">
 <div>
      <button onClick={handlePreviousImage}>Gerçekten Önceki</button>
      <img
        src={images[currentImage]}
        alt="Değiştirilebilir resim"
        className="absolute left-0 top-0 xl:-top-36 -z-0 w-screen object-cover object-top"
      />
      <button onClick={handleNextImage}>Sonraki</button>
    </div>
    <div className=" w-full p-12 h-auto bg-[#ececec] border-[1px] border-[#cccc] rounded-lg flex flex-col gap-6 z-10">
    <div className="w-full h-auto grid grid-cols-2 sm:flex justify-between items-center">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => handleOptionClick(option.value)}
          colorScheme="blackAlpha"
          variant={commerceType.includes(option.value) ? 'solid' : 'ghost'}
        >
          {option.label}
        </Button>
      ))}
    </div>

        <div className="flex flex-col xl:flex-row gap-4">
          <Input
            placeholder='Keywords'
            colorScheme='blackAlpha'
            focusBorderColor='#979797'
            onKeyDown={handleTabKeyPress}
          />
          <div className="flex">

            {keywords.map((keyword, index) => (
              <Tag key={index} borderRadius='full' variant='solid' colorScheme='blackAlpha' mr={1.5} mt={0.5} p={1.5}>
                <TagLabel>{keyword}</TagLabel>
                <TagCloseButton onClick={() => handleKeywordDelete(keyword)} />
              </Tag>
            ))}
          </div>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log({
            "commerceType": commerceType,
            "keyword": keywords,
            "RentOrSale": rentorsale,
            "Country": country,
            "state": state,
            "room": room,
            "reSale": reSale,
            "rate": rating,
            "date": `${formatSelectedDate(selectedRange[0])}`,
            "price": minMax
          })
          toast({
            title: `başarıyla konsola çıktı yazıldı.`,
            status: 'success',
            isClosable: true,
          })
        }} className="flex flex-col gap-16 justify-center">
          <div className='flex flex-col xl:flex-row gap-4 xl:gap-20 pt-8'>
            <Select required value={rentorsale} onChange={(e) => setRentorsale(e.target.value)}>
              <option value='option1'>Rent</option>
              <option value='option2'>Sale</option>
            </Select>
            <Select required value={country} onChange={(e) => {
              setCountry(e.target.value)
              setState("")
            }} placeholder='Country'>
              {Object.keys(WorldData).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Select>
            <Select required value={state} onChange={(e) => setState(e.target.value)} placeholder='State'>
              {WorldData[country]?.map((city) => <option key={city} value={city}>{city}</option>)}
            </Select>
            <Select value={room} onChange={(e) => setRoom(e.target.value)}>
              <option value='1+1'>1+1</option>
              <option value='2+1'>2+1</option>
              <option value='3+1'>3+1</option>
            </Select>
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-center">
            <Checkbox borderX="1px" borderY="1px" width="auto" padding="6px" borderRadius="8px" borderColor="#cecece" value={reSale} onChange={(e) => setreSale(e.target.value)} colorScheme='blackAlpha'>Re Sale</Checkbox>
            <div className="flex items-ceter text-sm font-semibold">
              <p className='m-auto'>Rate:</p>
              {[...Array(5)].map((_, index) => (
                <IconButton
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent", opacity: "0.75" }}
                  key={index}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" fill={index < rating ? "#d69e2e" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" stroke='#d69e2e' strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  }
                  onClick={() => handleRating(index + 1)}
                />
              ))}</div>
            <Box p={4}>
              <DateRangePicker formatSelectedDate={formatSelectedDate} selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
            </Box>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 items-center font-semibold text-sm">
                Price:
                <Input
                  type="number"
                  value={minMax[0]}
                  onChange={handleMinChange}
                  min={0}
                  max={minMax[1]}
                />
                -
                <Input
                  type="number"
                  value={minMax[1]}
                  onChange={handleMaxChange}
                  min={minMax[0]}
                  max={999999}
                />
              </div>
              <RangeSlider
                colorScheme="blackAlpha"
                onChange={(val) => setMinMax(val)}
                defaultValue={[0, 999999]}
                min={0}
                max={999999}
                value={minMax}
                step={10}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-24">
            <Button colorScheme="teal" type="submit" marginBottom="2">
              Search
            </Button>
            <Button colorScheme="red" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
      </div>
      <div className="h-96"></div>
    </div>
  )
}

export default Home