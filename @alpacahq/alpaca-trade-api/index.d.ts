// Type definitions for @alpacahq/alpaca-trade-api v1.2.6
// Project: https://github.com/alpacahq/alpaca-trade-api-js
// Definitions by: Prem Kumar Murugesan <https://github.com/iamprem>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module '@alpacahq/alpaca-trade-api' {
    export = Alpaca;

    interface Account {
        id: string;
        account_number: string;
        status: string;
        currency: string;
        cash: string;
        portfolio_value: string;
        pattern_day_trader: boolean;
        trade_suspended_by_user: boolean;
        trading_blocked: boolean;
        transfers_blocked: boolean;
        account_blocked: boolean;
        created_at: string;
        shorting_enabled: boolean;
        long_market_value: string;
        short_market_value: string;
        equity: string;
        last_equity: string;
        multiplier: string;
        buying_power: string;
        initial_margin: string;
        maintenance_margin: string;
        sma: string;
        daytrade_count: number;
        last_maintenance_margin: string;
        daytrading_buying_power: string;
        regt_buying_power: string;
    }

    interface AccountActivity {
        activity_type: string;
        id: string;
        cum_qty: string;
        leaves_qty: string;
        price: string;
        qty: string;
        side: string;
        symbol: string;
        transaction_time: string;
        type: string;
    }

    interface AccountConfigurations {
        dtbp_check: string;
        no_shorting: boolean;
        suspend_trade: boolean;
        trade_confirm_email: string;
    }

    interface Clock {
        timestamp: string,
        is_open: boolean,
        next_open: string,
        next_close: string
    }

    interface Calendar {
        date: string,
        open: string,
        close: string
    }

    interface Asset {
        id: string,
        class: string,
        exchange: string,
        symbol: string,
        status: string,
        tradable: boolean,
        marginable: boolean,
        shortable: boolean,
        easy_to_borrow: boolean
    }
    
    interface Order {
        id: string;
        client_order_id: string;
        created_at: string;
        updated_at?: string;
        submitted_at?: string;
        filled_at?: string;
        expired_at?: string;
        canceled_at?: string;
        failed_at?: string;
        asset_id: string;
        symbol: string;
        asset_class: string;
        qty: string;
        filled_qty: string;
        type: string;
        side: string;
        time_in_force: string;
        limit_price?: string;
        stop_price?: string;
        filled_avg_price?: string;
        status: string;
        extended_hours: boolean;
    }
    
    interface Position {
        asset_id: string,
        symbol: string,
        exchange: string,
        asset_class: string,
        avg_entry_price: string,
        qty: string,
        side: string,
        market_value: string,
        cost_basis: string,
        unrealized_pl: string,
        unrealized_plpc: string,
        unrealized_intraday_pl: string,
        unrealized_intraday_plpc: string,
        current_price: string,
        lastday_price: string,
        change_today: string
    }

    class Alpaca {
        constructor(
            config: {
                baseUrl?: string,
                dataBaseUrl?: string,
                polygonBaseUrl?: string,
                keyId?: string,
                secretKey?: string,
                apiVersion?: string,
                oauth?: string,
                paper?: boolean
            }
        );

        
        // Helper methods
        httpRequest(endpoint: any, queryParams: any, body: any, method: any): Promise<any>;
        
        dataHttpRequest(endpoint: any, queryParams: any, body: any, method: any): Promise<any>;
        
        polygonHttpRequest(endpoint: any, queryParams: any, body: any, method: any, apiVersion: any): Promise<any>;


        // Account
        getAccount(): Promise<Account>;


        // Account Activities
        getAccountActivities(
            {} : {
                activityTypes: string | string[],
                until: Date,
                after: Date,
                direction: string,
                date: Date,
                pageSize: number
            }
        ): Promise<AccountActivity>;


        // Account Configurations
        getAccountConfigurations(): Promise<AccountConfigurations>;
        
        updateAccountConfigurations(configs: AccountConfigurations): Promise<AccountConfigurations>;


        // Orders
        getOrder(id: string): Promise<Order>;
        
        getOrderByClientId(clientOrderId: string): Promise<Order>;

        getOrders(
            {}: {
                status: 'open' | 'closed' | 'all',
                until: Date,
                after: Date,
                limit: number,
                direction: 'asc' | 'desc'
            }
        ): Promise<Order[]>;

        createOrder(
            order: {
                symbol: string,
                qty: number,
                side: 'buy' | 'sell',
                type: 'market' | 'limit' | 'stop' | 'stop_limit',
                time_in_force:'day' | 'gtc' | 'opg' | 'cls' | 'ioc' | 'fok',
                limit_price?: number,
                stop_price?: number,
                extended_hours?: boolean,
                client_order_id?: string
            }
        ): Promise<Order>;

        replaceOrder(
            id: string,
            newOrder: {
                qty: number,
                time_in_force:'day' | 'gtc' | 'opg' | 'cls' | 'ioc' | 'fok',
                limit_price?: number,
                stop_price?: number,
                client_order_id?: string
            }
        ): Promise<Order>;

        cancelAllOrders(): Promise<any>;

        cancelOrder(id: string): Promise<any>;
  

        // Positions
        getPosition(symbol: string): Promise<Position>;
        
        getPositions(): Promise<Position[]>;
        
        closeAllPositions(): Promise<any>;
        
        closePosition(symbol: string): Promise<any>;


        // Asset
        getAsset(symbol: string): Promise<Asset>;
        
        getAssets(
            options: {
                status: 'active' | 'inactive',
                asset_class: string
            }
        ): Promise<Asset[]>;


        // Calendar
        getCalendar(
            {}: {
                start: Date,
                end: Date
            }
        ): Promise<Calendar>;


        // Clock
        getClock(): Promise<Clock>;

        
        // Bars
        getBars(timeframe: any, symbols: any, options: any): Promise<any>;

        
        // Polygon
        // TODO
        getAnalysts(symbol: any): Promise<any>;
        
        getCompany(symbol: any): Promise<any>;
        
        getConditionMap(ticktype: any): Promise<any>;
        
        getDividends(symbol: any): Promise<any>;
        
        getEarnings(symbol: any): Promise<any>;
        
        getExchanges(): Promise<any>;
        
        getFinancials(symbol: any): Promise<any>;
        
        getHistoricAggregates(size: any, symbol: any, options: any): Promise<any>;
        
        getHistoricAggregatesV2(symbol: any, multiplier: any, size: any, from: any, to: any, options: any): Promise<any>;
        
        getHistoricQuotes(symbol: any, date: any, options: any): Promise<any>;
        
        getHistoricTrades(symbol: any, date: any, options: any): Promise<any>;
        
        getLastQuote(symbol: any): Promise<any>;
        
        getLastTrade(symbol: any): Promise<any>;
        
        getNews(symbol: any): Promise<any>;
        
        getSplits(symbol: any): Promise<any>;
        
        getSymbol(symbol: any): Promise<any>;
        
        getSymbolTypeMap(): Promise<any>;
        
    }

}