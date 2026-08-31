export interface NoteData {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  content: string[];
}

export interface ObjectiveItem {
  id: number;
  title: string;
  description: string;
  hint: string;
  subObjective?: string;
}

export const OBJECTIVES: ObjectiveItem[] = [
  {
    id: 0,
    title: "Check the Radio Console",
    description: "Inspect the main radio communication console in the Radio Control Room.",
    hint: "Walk over to the radio desk and press [E] to examine the receiver.",
    subObjective: "Check weather telemetry logs on the right desk.",
  },
  {
    id: 1,
    title: "Tune to Unidentified Frequency (13.13 MHz)",
    description: "The radio briefly spiked at 13.13 MHz. Tune the frequency receiver to lock onto the carrier signal.",
    hint: "Use the radio tuning dial or arrow keys to reach 13.13 MHz.",
    subObjective: "Align S-Meter to maximum signal clarity.",
  },
  {
    id: 2,
    title: "Restore Auxiliary Generator Circuit",
    description: "Recover the spare 200A Ceramic Fuse from the Observation Deck supply locker and insert it into the Generator panel.",
    hint: "Follow hallway signs to the Observation Deck, take the fuse from the west cabinet, then enter the Auxiliary Generator Room.",
    subObjective: "Check maintenance log on the desk if confused.",
  },
  {
    id: 3,
    title: "Search the Archive Room for Black Tide Records",
    description: "The corridor west doors are now powered. Search the Archive Room for historical incident logs and station floorplans.",
    hint: "Exit into the hallway and turn left into the Archive Room. Inspect documents on the central table.",
    subObjective: "Collect the Torn Station Blueprint Grid.",
  },
  {
    id: 4,
    title: "Locate Archive Cabinet Key in Sleeping Quarters",
    description: "Follow the blueprint grid notes to the Sleeping Quarters (Sector SQ-04) to find the hidden cabinet key.",
    hint: "Enter the Sleeping Quarters further down the west corridor. Inspect the framed photograph and locker by Bunk 2.",
    subObjective: "Inspect the shifting wall clock in the bunk room.",
  },
  {
    id: 5,
    title: "Unlock Archive Cabinet & Play Cassette Tape #1",
    description: "Use the key to unlock the steel security cabinet in the Archive Room, retrieve Cassette Tape #1, and play it on the tape recorder.",
    hint: "Return to the Archive Room, open the locked cabinet, and interact with the tape deck on the desk.",
    subObjective: "Listen closely for spoken frequency numbers.",
  },
  {
    id: 6,
    title: "Tune Radio Console to 14.28 MHz",
    description: "The cassette revealed a lost emergency channel at 14.28 MHz. Return to the Radio Control Room to tune the receiver.",
    hint: "Adjust the transceiver slider to 14.28 MHz and listen to the incoming transmission.",
    subObjective: "Collect the Beacon Calibration parameters.",
  },
  {
    id: 7,
    title: "Calibrate Beacon Optical Relay",
    description: "Open the Beacon Calibration Terminal on the Observation Deck or Radio Desk. Match Target Frequency (13.13 MHz), Output Power (85%), and Azimuth Direction (240° SW).",
    hint: "Adjust all three dials until resonance reaches 100% to open the upper Signal Tower hatch.",
    subObjective: "Review the Investigation Board for full mystery context.",
  },
  {
    id: 8,
    title: "Ascend to Signal Tower & Broadcast Final Decision",
    description: "The ladder hatch to the upper Signal Tower on the Observation Deck is unlocked. Climb up to the Upper Beacon Array to transmit your final command.",
    hint: "Ascend the stairs/ladder on the Observation Deck into the Signal Tower and interact with the Upper Array Terminal.",
    subObjective: "Review the Narrative Recap to see if all optional evidence is collected.",
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

export const BLACK_TIDE_REPORT: NoteData = {
  id: "black_tide_report_86",
  title: "OFFICIAL INQUIRY: BLACK TIDE INCIDENT",
  subtitle: "Department of Maritime Safety - Confidential File 1986-D",
  date: "November 4, 1986",
  author: "Board of Inquiry",
  content: [
    "INCIDENT SUMMARY: On the night of October 13, 1986, the freighter S.S. Calypso vanished 4.2 nautical miles off Station 13.",
    "INVESTIGATION FINDINGS: The night operator at Station 13 logged multiple intermittent radio signals on 14.28 MHz, but dismissed them as storm interference.",
    "The emergency beacon remained deactivated during the vessel's critical navigation window through the Black Tide Shoals.",
    "CONCLUSION: Operator error cited. The station was subsequently automated and retrofitted with high-voltage optical relay conduits.",
    "ANOMALY NOTE: Subsequent operators reported receiving delayed distress calls on identical dates every storm cycle.",
  ],
};

export const NEWSPAPER_CLIPPING: NoteData = {
  id: "newspaper_clipping_86",
  title: "THE COASTAL HERALD - ARCHIVE PRINT",
  subtitle: "Headline Edition: 'LOST IN THE DEAD SECTOR'",
  date: "October 16, 1986",
  author: "Staff Reporter",
  content: [
    "'SEARCH FOR SS CALYPSO CALLED OFF AS COASTAL MYSTERY DEEPENS'",
    "Wreckage from the 400-foot cargo carrier has failed to wash ashore despite gale-force winds pushing directly toward the cliffs of Station 13.",
    "Local fishermen report strange optical flashes across the horizon precisely at 01:13 AM, claiming the lighthouse beacon appeared to rotate backward against the gale.",
    "Maritime authorities maintain that atmospheric anomalies over the Black Tide trench create extreme electromagnetic distortion.",
  ],
};

export const ELI_DIARY_NOTE: NoteData = {
  id: "eli_diary_note_01",
  title: "OPERATOR'S PERSONAL DIARY",
  subtitle: "Recovered from Bunk Room Drawer",
  date: "Undated Entry",
  author: "Eli Navarro",
  content: [
    "I took this night post thinking it would be quiet. Just barometers, rain gauges, and logging shipping traffic.",
    "But tonight feels different. The clock stopped at 01:13 AM. I reset it three times, but it always ticks back to the same minute.",
    "When I checked the crew photographs in the hallway, I swear I recognized my own handwriting in logs dated thirty years ago.",
    "If Signal 13 is speaking to me... it's not a ghost from the past. It's someone telling me to fix what was broken before it repeats.",
  ],
};

export const BEACON_CALIBRATION_DOC: NoteData = {
  id: "beacon_calib_doc",
  title: "BEACON OPTICAL RELAY SPECIFICATIONS",
  subtitle: "Standard Operating Procedure #84-B",
  date: "October 13, 01:12 AM",
  author: "Coastal Station Engineering",
  content: [
    "To achieve full optical resonance across the coastal gale, configure the following calibration parameters on the Observation Deck console:",
    "1. TARGET FREQUENCY: 13.13 MHz (Phase-Locked Carrier Sync)",
    "2. OUTPUT POWER GAIN: 85% (Optimal Arc Threshold without blowing the auxiliary fuse)",
    "3. AZIMUTH DIRECTION: 240° (South-West Alignment facing the Black Tide Trench)",
    "WARNING: Failure to calibrate before triggering beacon relay will overload the secondary capacitors.",
  ],
};

export const OPERATOR_FINAL_LOG: NoteData = {
  id: "operator_final_log",
  title: "SIGNAL TOWER TRANSMISSION LOG: 1986",
  subtitle: "Classified Tower Dossier - Sector 13 Upper Deck",
  date: "October 13, 01:13 AM (1986)",
  author: "Night Operator (Eli Vance Navarro)",
  content: [
    "If anyone reads this from the other side of the storm: the S.S. Calypso never sank.",
    "When the optical relay pulsed at 13.13 MHz, the light didn't just illuminate the shoals... it synchronized two moments separated by decades.",
    "The signal we are hearing isn't an echo of a disaster. It is a continuous bridge waiting for someone to complete the circuit.",
    "If you hold the carrier wave open at 13.13 MHz, the timeline will permanently fuse. Station 13 will become the anchor.",
  ],
};

export const CASSETTE_TRANSCRIPTS = {
  TAPE_A: "Shift Log... October 13... Vance speaking. We can hear them again through the static. They aren't on 13.13... the distress carrier is modulated on 14.28 MHz. If anyone is listening... tune to 14.28... calibrate the beacon before the shoals take them.",
  TAPE_B: "Mayday... Mayday... S.S. Calypso to Station 13... we have lost steerage in the gale... our radar is blinded... if you can illuminate the beacon at 240 degrees, we can clear the rocks... do not let the light go out...",
};

export const RADIO_TRANSCRIPTS = {
  FIRST_SIGNAL: "Station 13... Restore the beacon circuit... Do not let the light go out...",
  SECOND_SIGNAL_1428: "Station 13, signal locked. We can see the auxiliary power surge. Set the beacon frequency to 13.13, power to 85 percent, and align azimuth to 240 degrees SW. The upper tower ladder is open.",
  FINAL_PRE_CHOICE: "The beacon array is calibrated and primed. The storm is at peak intensity. Decide the fate of Signal 13.",
  BEACON_ENDING: "Beacon transmission confirmed. Optical beam locked at 240 degrees. Vessel acknowledgment received. The storm breaks over Station 13.",
  SILENT_ENDING: "Transceiver power severed. All bands silent. The carrier wave dissolves into the void. Station clock resets to 01:13 AM.",
  UNKNOWN_SIGNAL_ENDING: "Unknown carrier resonance achieved. The 13.13 MHz frequency expands across all channels. The storm exterior freezes in place. Station 13 transcends the timeline.",
};
