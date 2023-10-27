import { parse, add, format } from 'date-fns';
import { channels } from './channels';
import { epg } from "./epg";

const baseURL = 'https://mfwkweb-api.clarovideo.net/services/epg/channel?device_id=web&device_category=web&device_model=web&device_type=web&device_so=Chrome&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.93&region=mexico&HKS=web61144bb49d549&user_id=54343080&date_from=20231027000000&date_to=20231027235959&quantity=5'

  export const fetchClaroVideoChannels = async () => {
  const res = await fetch(baseURL);
  const {response: {channels}} = await res.json();

  const channelsData = formatChannels(channels)
  const unformattedEpgData = formatEpgData(channels)

  const EPGData = mergeChannelsInfo(unformattedEpgData)

    return { channelsData, EPGData };
  }

  const formatChannels = (channels) => {
    return channels.map(channel => ({
      uuid: channel.id,
      type: 'channel',
      title: channel.name,
      country: 'Mexico',
      provider: channel.number,
      logo: channel.image,
      year: 2002
    }));
  };

  const formatEpgData = (channels) => {
    return channels.map(channel => ({
      channels: channel.events.map(event => ({
          id: event.id,
          description: event.description,
          title: event.name,
          isYesterday:true,
          since: convertDateFormat(event.date_begin),
          till: convertDateFormat(event.date_end),
          channelUuid: event.channel_id,
          image:"https://www.themoviedb.org/t/p/w1066_and_h600_bestv2/sjx6zjQI2dLGtEL0HGWsnq6UyLU.jpg",
          country:'Ghana',
          Year:'2021–',
          Rated:"TV-14",
          Released:"29 Dec 2021",
          Runtime:"N/A",
          Genre:"Action, Adventure, Sci-Fi",
          Director:"N/A",
          Writer:"Jon Favreau",
          Actors:"Temuera Morrison, Ming-Na Wen, Matt Berry",
          Language:"English",
          Country:"United States",
          Awards:"N/A",
          Metascore:"N/A",
          imdbRating:"8.0",
          imdbVotes:"20,147",
          imdbID:"tt13668894",
          Type:"series",
          totalSeasons:"1",
          Response:"True",
          Ratings:[
            {
              Source:"Internet Movie Database",
              Value:"8.0/10"
            }
          ],
          rating:3
        }))
    }));
  }

  export const convertDateFormat = (inputDate: string) => {
    const parsedDate = parse(inputDate, 'yyyy/MM/dd HH:mm:ss', new Date());
    const modifiedDate = add(parsedDate, {
      hours: 3,
      minutes: 50,
    });
    const formattedDate = format(modifiedDate, 'yyyy-MM-dd\'T\'HH:mm:ss');
    return formattedDate;
  }

  const mergeChannelsInfo = (channelsArray) => {
    const arrayOfArrays = channelsArray.map(el => el.channels);
    return [].concat(...arrayOfArrays)
  }

export const fetchChannels = async () =>
  new Promise((res) => setTimeout(() => res(channels), 400));

export const fetchEpg = async () =>
  new Promise((res) => setTimeout(() => res(epg), 500));