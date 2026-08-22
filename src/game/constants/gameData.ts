export interface NoteData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  content: string[];
}

export const OBJECTIVES = [
  {
    id: 0,
    title: "Check the Radio Console",
    description: "Inspect the main radio communication console in the Radio Control Room.",
    hint: "Walk over to the radio desk and press [E] to examine the receiver.",
  },
  {
    id: 1,
    title: "Tune to Unidentified Frequency",
    description: "The radio briefly spiked at 13.13 MHz. Tune the frequency receiver to lock onto the signal.",
    hint: "Use the radio tuning dial or arrow keys to reach 13.13 MHz.",
  },
  {
    id: 2,
    title: "Find the Emergency Fuse",
    description: "Check the maintenance log for spare fuses and locate the supply cabinet at the Observation Deck.",
    hint: "Read the note on the desk, then exit into the hallway and follow signs to the Observation Deck.",
  },
  {
    id: 3,
    title: "Restore Generator Circuit",
    description: "The hallway generator door is now accessible. Insert the emergency fuse into the generator panel.",
    hint: "Return down the hallway, enter the Generator Room, and interact with the empty fuse socket.",
  },
  {
    id: 4,
    title: "Return to Radio Room",
    description: "Power has been restored, but a second emergency broadcast is transmitting at the console.",
    hint: "Head back to the Radio Control Room console.",
  },
  {
    id: 5,
    title: "Decide Fate of Signal 13",
    description: "Choose whether to activate the emergency beacon or shut down the radio frequency permanently.",
    hint: "Interact with the radio console to make your decision.",
  },
];

export const MAINTENANCE_NOTE: NoteData = {
  id: "maint_note_01",
  title: "SHIFT HANDOVER & EMERGENCY PROTOCOL",
  subtitle: "Weather Station 13 - Coastal Sector D",
  date: "October 13, 01:00 AM",
  author: "Chief Tech R. Vance",
  content: [
    "To Eli (Night Shift Operator):",
    "Storm intensity has exceeded gale-force. The main transmitter breaker tripped twice earlier tonight.",
    "If the beacon circuit drops offline, DO NOT PANIC. I placed a spare 200A Ceramic Fuse in the waterproof supply cabinet out on the Observation Deck.",
    "Note: The generator room electronic lock is wired to the auxiliary sub-panel. If it glitches, cycling the main receiver frequency usually resets the relay.",
    "Keep your eyes on the barometer. If you see lights out in Sector 4... keep the lights on.",
  ],
};

export const WEATHER_LOG: NoteData = {
  id: "weather_log_01",
  title: "METEOROLOGICAL TRANSMISSION LOG",
  subtitle: "Automated Coastal Radar System",
  date: "October 13, 01:10 AM",
  author: "Automated Station Sensor",
  content: [
    "BAROMETRIC PRESSURE: 942 hPa (Rapid descent)",
    "SURFACE WIND: 62 knots NNW with extreme gusts",
    "PRECIPITATION: Severe continuous squalls",
    "SEA STATE: High swells, zero visibility beyond 400m",
    "ANOMALY WARNING: Electromagnetic interference detected on HF band (13.00 - 13.50 MHz). Source: Stationary off-shore coordinates.",
    "STATUS: Emergency Beacon Standby.",
  ],
};

export const TRANSMISSION_TRANSCRIPTS = {
  FIRST_SIGNAL: "Station 13... Restore the beacon circuit... Do not let the light go out...",
  SECOND_SIGNAL: "The perimeter is collapsing... The vessel at sea is awaiting the beacon... or silence the frequency before it connects...",
  BEACON_ENDING: "Beacon transmission confirmed. Coordinates locked. Storm dissipating. Sector 13 acknowledged.",
  SILENT_ENDING: "Carrier frequency terminated. All bands silent. The clock resets... 01:13 AM.",
};
