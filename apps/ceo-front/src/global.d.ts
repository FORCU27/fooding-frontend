export {};

declare global {
  namespace kakao.maps {
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
      getCenter(): LatLng;
      setLevel(level: number): void;
      getLevel(): number;
      relayout(): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(position: LatLng): void;
    }

    class MarkerImage {
      constructor(src: string, size: Size, options?: { offset?: Point });
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    interface MapOptions {
      center: LatLng;
      level: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map: Map;
      image?: MarkerImage;
    }

    namespace services {
      class Geocoder {
        addressSearch(address: string, callback: (result: GeocoderResult[], status: Status) => void): void;
        coord2Address(lng: number, lat: number, callback: (result: RegionCode[], status: Status) => void): void;
      }

      interface GeocoderResult {
        address_name: string;
        x: string;
        y: string;
        road_address?: {
          address_name: string;
          building_name: string;
          zone_no: string;
        };
      }

      interface RegionCode {
        address_name: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        road_address?: {
          address_name: string;
          building_name: string;
          zone_no: string;
        };
      }

      type Status = string;

      const Status: {
        OK: string;
        ZERO_RESULT: string;
        ERROR: string;
      };
    }

    namespace event {
      function addListener(target: Map | Marker, type: string, handler: (e: MouseEvent) => void): void;
      function removeListener(target: Map | Marker, type: string, handler: (e: MouseEvent) => void): void;
    }

    interface MouseEvent {
      latLng: LatLng;
    }

    function load(callback: () => void): void;
  }

  interface Window {
    kakao: typeof kakao;
    interop?: {
      setBadgeCount: (count: number) => void;
    };
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams | Date
    ) => void;
  }
}
