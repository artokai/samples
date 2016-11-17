declare var _spPageContextInfo: any;

namespace ESPC16.demo {
    interface IRestResponse {
        value : IESPC16Session[];
    }

    interface IESPC16Session {
        Date: Date;
        Time: string;
        Title: string;
        Speaker: string;
        Room: string;
    }

    export class ESPC16ScriptPart
    {
        private sessions : IESPC16Session[];
        private filter: string;

        constructor(private container: HTMLElement) {
            // Bind 'this' for callbacks
            this.onError = this.onError.bind(this);
            this.onLoadSessionsReady = this.onLoadSessionsReady.bind(this);
        }

        private onError(msg: string): void {
            this.container.innerHTML = `<div class="error">ERROR: ${msg}</div>`;;
        }

        public render(): void  {
            this.loadSessions(this.onLoadSessionsReady, this.onError);
        }

        private loadSessions(successCallback : any, errorCallback: (msg:string) => void) {
            let xhr = new XMLHttpRequest();
            xhr.onerror = (e) => { errorCallback("Error executing ajax call!"); }
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300)
                {
                     errorCallback(`Invalid status code (${xhr.status}) from ajax call!`);
                } else {
                    const response:IRestResponse = JSON.parse(xhr.responseText, (key, value) => {
                        return (key === "Date") ?  new Date(value): value;
                    });
                    successCallback(response.value)
                }
            }

            const siteUrl = _spPageContextInfo.webAbsoluteUrl;
            const listUrl = "/_api/web/lists/GetByTitle('ESPC16%20Sessions')/items?";
            const select = "$select=Date,Time,Title,Speaker,Room";
            const url =  siteUrl + listUrl + select;

            xhr.open("GET", url, true);
            xhr.setRequestHeader('Accept', 'application/json; odata=nometadata');
            xhr.send();
        }

        private onLoadSessionsReady(sessions:IESPC16Session[]): void {
            this.sessions = sessions;

            this.container.innerHTML = `
            <div class="filter">
                Search for sessions:
                <input type="text" size=25 class="filterstring">
                <input type="button" value="Search" class="filterbtn">
            </div>
            <div class="results"></div>
            `;

            const searchBtn = this.container.getElementsByClassName("filterbtn")[0] as HTMLElement;
            searchBtn.onclick = () => {
                const filterInput = this.container.getElementsByClassName("filterstring")[0] as HTMLInputElement;
                this.filter = filterInput.value.toLowerCase();
                this.renderSessions();
            };

            this.renderSessions();
        }

        private renderSessions()
        {
            const searchResults = this.container.getElementsByClassName("results")[0] as HTMLElement;

            let html = "<ul>";
            const filteredSessions = this.sessions.filter(this.sessionFilter, this);
            for(var i=0; i<filteredSessions.length; i++)
            {
                const session = filteredSessions[i];
                const weekDay = session.Date.getDay();
                const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                html += `
                    <li>
                        <div class="datetime">
                            <div class="day">${dayNames[weekDay]}</div>
                            <div class="time">${session.Time}</div>
                        </div>
                        <div class="title">${session.Title}</div>
                        <div class="Speaker">${session.Speaker}</div>
                        <div class="room">Room: ${session.Room}</div>
                    </li>
                `;
            }
            html += "</ul>"
            searchResults.innerHTML = html;
        }

        private sessionFilter(session: IESPC16Session): boolean
        {
            if (! this.filter)
                return true;
            return session.Title.toLowerCase().indexOf(this.filter) >= 0;
        }
    }
}
